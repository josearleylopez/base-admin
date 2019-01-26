import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { CentroCostoService } from '../../services/service.index';
import { CentroCosto } from '../../models/centro-costo.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-centro-costo',
  templateUrl: './centro-costo.component.html',
  styles: []
})
export class CentroCostoComponent implements OnInit {

  centroCosto: CentroCosto = new CentroCosto('', '', false);
  forma: FormGroup;

  constructor(
    public _centroCostoService: CentroCostoService,
    public router: Router,
    public activateRoute: ActivatedRoute,
  ) {

    this.forma = new FormGroup({
      '_id': new FormControl(),
      'codigo': new FormControl('', [Validators.required]),
      'nombre': new FormControl('', [Validators.required]),
      'estado': new FormControl(false, [Validators.required]),
    });

    activateRoute.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'nuevo') {
        this.cargarCentroCosto(id);
      }
    });
  }

  ngOnInit() {
  }

  cargarCentroCosto(id: string) {
    this._centroCostoService.cargarCentroCosto(id).subscribe( centroCosto => {
      this.centroCosto = centroCosto;
      this.cargarForma();
    });
  }

  cargarForma() {
    this.forma.controls['_id'].setValue(this.centroCosto._id);
    this.forma.controls['codigo'].setValue(this.centroCosto.codigo);
    this.forma.controls['nombre'].setValue(this.centroCosto.nombre);
    this.forma.controls['estado'].setValue(this.centroCosto.estado);
  }

  actualizarObjeto() {
    this.centroCosto.codigo = this.forma.controls['codigo'].value;
    this.centroCosto.nombre = this.forma.controls['nombre'].value;
    this.centroCosto.estado = this.forma.controls['estado'].value;
  }

  guardarCentroCosto() {
    if (this.forma.invalid) {
      return;
    }
    this.actualizarObjeto();
    this._centroCostoService.guardarCentroCosto(this.centroCosto).subscribe(centroCosto => {
      this.centroCosto._id = centroCosto._id;
      this.router.navigate(['/centro-costo', centroCosto._id]);
    });
  }

}
