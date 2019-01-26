import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { RutaService } from '../../services/service.index';
import { Ruta } from '../../models/ruta.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Municipio } from '../../models/municipio.model';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styles: []
})
export class RutaComponent implements OnInit {

  ruta: Ruta = new Ruta('', '', '');
  municipios: Municipio[] = [];
  forma: FormGroup;

  constructor(
    public _rutaService: RutaService,
    public router: Router,
    public activateRoute: ActivatedRoute,
  ) {

    this.forma = new FormGroup({
      '_id': new FormControl(),
      'nombre': new FormControl('', [Validators.required]),
      'origen': new FormControl('', [Validators.required]),
      'destino': new FormControl('', [Validators.required]),
      'descripcion': new FormControl('', [Validators.required]),
      'valorFlete': new FormControl(null, [Validators.required, Validators.pattern('[0-9]+')]),
      'valorViaticos': new FormControl(false, [Validators.required, Validators.pattern('[0-9]+')]),
      'valorPeaje': new FormControl('PUBLICO', [Validators.required, Validators.pattern('[0-9]+')]),
      'peaje': new FormControl(false, [Validators.required]),
      'hotel': new FormControl(true, [Validators.required])
    });

    activateRoute.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'nuevo') {
        this.cargarRuta(id);
      }
    });
  }

  ngOnInit() {
    this._rutaService.cargarMunicipios().subscribe(municipios => this.municipios = municipios);
  }

  cargarRuta(id: string) {
    this._rutaService.cargarRuta(id).subscribe( ruta => {
      this.ruta = ruta;
      this.cargarForma();
    });
  }

  cargarForma() {
    this.forma.controls['_id'].setValue(this.ruta._id);
    this.forma.controls['nombre'].setValue(this.ruta.nombre);
    this.forma.controls['origen'].setValue(this.ruta.origen);
    this.forma.controls['destino'].setValue(this.ruta.destino);
    this.forma.controls['descripcion'].setValue(this.ruta.descripcion);
    this.forma.controls['valorFlete'].setValue(this.ruta.valorFlete);
    this.forma.controls['valorViaticos'].setValue(this.ruta.valorViaticos);
    this.forma.controls['valorPeaje'].setValue(this.ruta.valorPeaje);
    this.forma.controls['peaje'].setValue(this.ruta.peaje);
    this.forma.controls['hotel'].setValue(this.ruta.hotel);
  }

  actualizarObjeto() {
    this.ruta.nombre = this.forma.controls['nombre'].value;
    this.ruta.origen = this.forma.controls['origen'].value;
    this.ruta.destino = this.forma.controls['destino'].value;
    this.ruta.descripcion = this.forma.controls['descripcion'].value;
    this.ruta.valorFlete = this.forma.controls['valorFlete'].value;
    this.ruta.valorViaticos = this.forma.controls['valorViaticos'].value;
    this.ruta.valorPeaje = this.forma.controls['valorPeaje'].value;
    this.ruta.peaje = this.forma.controls['peaje'].value;
    this.ruta.hotel = this.forma.controls['hotel'].value;
  }

  guardarRuta() {
    if (this.forma.invalid) {
      return;
    }
    this.actualizarObjeto();
    this._rutaService.guardarRuta(this.ruta).subscribe(ruta => {
      this.ruta._id = ruta._id;
      this.router.navigate(['/ruta', ruta._id]);
    });
  }

}
