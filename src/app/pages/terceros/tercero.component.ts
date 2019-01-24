import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { TerceroService } from '../../services/service.index';
import { Tercero } from '../../models/tercero.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tercero',
  templateUrl: './tercero.component.html',
  styles: []
})
export class TerceroComponent implements OnInit {

  tercero: Tercero = new Tercero(0, '', '');
  forma: FormGroup;

  constructor(
    public _terceroService: TerceroService,
    public router: Router,
    public activateRoute: ActivatedRoute,
  ) {

    this.forma = new FormGroup({
      '_id': new FormControl(),
      'tipoDocumento': new FormControl(1, [Validators.required]),
      'codigo': new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
      'nombres': new FormControl(''),
      'apellidos': new FormControl(''),
      'razonSocial': new FormControl('', [Validators.required, Validators.required]),
      'telefono': new FormControl('', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(6)]),
    });

    activateRoute.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'nuevo') {
        this.cargarTercero(id);
      }
    });


    this.forma.controls['tipoDocumento'].valueChanges.subscribe(data => {
      this.forma.get('razonSocial').setValue('', {emitEvent: false});
      this.forma.get('nombres').setValue('', {emitEvent: false});
      this.forma.get('apellidos').setValue('', {emitEvent: false});
    });

    this.forma.controls['nombres'].valueChanges.subscribe(data => {
      this.forma.get('razonSocial').setValue(this.forma.get('apellidos').value + ' ' + data);
    });

    this.forma.controls['apellidos'].valueChanges.subscribe(data => {
      this.forma.get('razonSocial').setValue(data + ' ' + this.forma.get('nombres').value);
    });


    this.forma.get('nombres').valueChanges
    .subscribe(data => {
      this.forma.get('nombres').setValue(data.toUpperCase(), {emitEvent: false});
    });
    this.forma.get('apellidos').valueChanges
    .subscribe(data => {
      this.forma.get('apellidos').setValue(data.toUpperCase(), {emitEvent: false});
    });
    this.forma.get('razonSocial').valueChanges
    .subscribe(data => {
      this.forma.get('razonSocial').setValue(data.toUpperCase(), {emitEvent: false});
    });

  }

  ngOnInit() {
  }

  cargarTercero(id: string) {
    this._terceroService.cargarTercero(id).subscribe( tercero => {
      this.tercero = tercero;
      // this.forma.setValue(tercero);
      this.cargarForma(tercero);
    });
  }

  cargarForma(tercero: Tercero) {
    this.forma.controls['_id'].setValue(tercero._id);
    this.forma.controls['tipoDocumento'].setValue(tercero.tipoDocumento);
    this.forma.controls['codigo'].setValue(tercero.codigo);
    this.forma.controls['nombres'].setValue(tercero.nombres);
    this.forma.controls['apellidos'].setValue(tercero.apellidos);
    this.forma.controls['razonSocial'].setValue(tercero.razonSocial);
    this.forma.controls['telefono'].setValue(tercero.telefono);
  }

  cargarObjeto() {
    this.tercero.tipoDocumento = this.forma.controls['tipoDocumento'].value;
    this.tercero.codigo = this.forma.controls['codigo'].value;
    this.tercero.nombres = this.forma.controls['nombres'].value;
    this.tercero.apellidos = this.forma.controls['apellidos'].value;
    this.tercero.razonSocial = this.forma.controls['razonSocial'].value;
    this.tercero.telefono = this.forma.controls['telefono'].value;
  }

  guardarTercero() {
    if (this.forma.invalid) {
      return;
    }
    this.cargarObjeto();
    this._terceroService.guardarTercero(this.forma.value).subscribe(tercero => {
      this.tercero._id = tercero._id;
      this.router.navigate(['/tercero', tercero._id]);
    });
  }

}
