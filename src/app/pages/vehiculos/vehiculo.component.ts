import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { VehiculoService, TerceroService } from '../../services/service.index';
import { Vehiculo } from '../../models/vehiculo.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Tercero } from '../../models/tercero.model';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styles: []
})
export class VehiculoComponent implements OnInit {

  vehiculo: Vehiculo = new Vehiculo('', '', '', 1900, 0);
  terceros: Tercero[] = [];
  forma: FormGroup;

  constructor(
    public _vehiculoService: VehiculoService,
    public _terceroService: TerceroService,
    public router: Router,
    public activateRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {

    this.forma = new FormGroup({
      '_id': new FormControl(),
      'placa': new FormControl('', [Validators.required, Validators.maxLength(6)]),
      'marca': new FormControl('', [Validators.required]),
      'descripcion': new FormControl('', [Validators.required]),
      'modelo': new FormControl('', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(4)]),
      'capacidad': new FormControl(null, [Validators.required]),
      'estado': new FormControl(false, [Validators.required]),
      'tipoServicio': new FormControl('PUBLICO', [Validators.required]),
      'vencimientoSOAT': new FormControl(null, [Validators.required]),
      'vencimientoTecnicoMecanica': new FormControl(null),
      'vencimientoSanidad': new FormControl(null),
      'vencimientoFumigacion': new FormControl(null),
      'tercero': new FormControl(null, [Validators.required]),
    });

    activateRoute.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'nuevo') {
        this.cargarVehiculo(id);
      }
    });
  }

  ngOnInit() {
    this._terceroService.cargarTerceros().subscribe(terceros => this.terceros = terceros);
    this._modalUploadService.notificacion
      .subscribe(res => {
        // console.log(res);
        this.vehiculo.img = res.vehiculo.img;
      });
  }

  cargarVehiculo(id: string) {
    this._vehiculoService.cargarVehiculo(id).subscribe( vehiculo => {
      this.vehiculo = vehiculo;
      this.cargarForma();
    });
  }

  cargarForma() {
    this.forma.controls['_id'].setValue(this.vehiculo._id);
    this.forma.controls['placa'].setValue(this.vehiculo.placa);
    this.forma.controls['marca'].setValue(this.vehiculo.marca);
    this.forma.controls['descripcion'].setValue(this.vehiculo.descripcion);
    this.forma.controls['modelo'].setValue(this.vehiculo.modelo);
    this.forma.controls['capacidad'].setValue(this.vehiculo.capacidad);
    this.forma.controls['tipoServicio'].setValue(this.vehiculo.tipoServicio);
    this.forma.controls['estado'].setValue(this.vehiculo.estado);
    this.forma.controls['tercero'].setValue(this.vehiculo.tercero);
    let fecha = new Date(this.vehiculo.vencimientoSOAT);
    this.forma.controls['vencimientoSOAT'].setValue(this.dateToString(fecha));
    fecha = new Date(this.vehiculo.vencimientoTecnicoMecanica);
    this.forma.controls['vencimientoTecnicoMecanica'].setValue(this.dateToString(fecha));
    fecha = new Date(this.vehiculo.vencimientoSanidad);
    this.forma.controls['vencimientoSanidad'].setValue(this.dateToString(fecha));
    fecha = new Date(this.vehiculo.vencimientoFumigacion);
    this.forma.controls['vencimientoFumigacion'].setValue(this.dateToString(fecha));
  }

  actualizarObjeto() {
    this.vehiculo.placa = this.forma.controls['placa'].value;
    this.vehiculo.marca = this.forma.controls['marca'].value;
    this.vehiculo.descripcion = this.forma.controls['descripcion'].value;
    this.vehiculo.modelo = this.forma.controls['modelo'].value;
    this.vehiculo.capacidad = this.forma.controls['capacidad'].value;
    this.vehiculo.tipoServicio = this.forma.controls['tipoServicio'].value;
    this.vehiculo.estado = this.forma.controls['estado'].value;
    this.vehiculo.tercero = this.forma.controls['tercero'].value;
    this.vehiculo.vencimientoSOAT = this.forma.controls['vencimientoSOAT'].value;
    this.vehiculo.vencimientoTecnicoMecanica = this.forma.controls['vencimientoTecnicoMecanica'].value;
    this.vehiculo.vencimientoSanidad = this.forma.controls['vencimientoSanidad'].value;
    this.vehiculo.vencimientoFumigacion = this.forma.controls['vencimientoFumigacion'].value;
  }

  dateToString(fecha: Date) {
    let mes = '';
    let dia = '';
    if (fecha.getUTCMonth() > 8) {
      mes = String((fecha.getUTCMonth() + 1));
    } else {
      mes = '0' + (fecha.getUTCMonth() + 1);
    }
    if (fecha.getUTCDate() > 8) {
      dia = String(fecha.getUTCDate());
    } else {
      dia = '0' + fecha.getUTCDate();
    }
    return fecha.getUTCFullYear() + '-' + mes + '-' + dia;
  }

  guardarVehiculo() {
    if (this.forma.invalid) {
      return;
    }
    this.actualizarObjeto();
    this._vehiculoService.guardarVehiculo(this.vehiculo).subscribe(vehiculo => {
      this.vehiculo._id = vehiculo._id;
      this.router.navigate(['/vehiculo', vehiculo._id]);
    });
  }

  cambiarImagen() {
    this._modalUploadService.mostarModal('vehiculos', this.vehiculo._id);
  }

  // cambioTercero(id: string) {
  //   this._terceroService.obtenerTercero(id).subscribe(tercero => {
  //     this.tercero = tercero;
  //   });
  // }
}
