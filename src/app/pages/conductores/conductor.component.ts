import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { ConductorService, HospitalService } from '../../services/service.index';
import { Conductor } from '../../models/conductor.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styles: []
})
export class ConductorComponent implements OnInit {

  hospitales: Hospital[];
  conductor: Conductor = new Conductor('', '', '');
  hospital: Hospital = new Hospital('');
  forma: FormGroup;

  constructor(
    public _conductorService: ConductorService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activateRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {

    this.forma = new FormGroup({
      '_id': new FormControl(),
      'cedula': new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
      'nombres': new FormControl('', [Validators.required]),
      'apellidos': new FormControl('', [Validators.required]),
      'telefono': new FormControl('', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(6)]),
      'licenciaConduccion': new FormControl(null, [Validators.required]),
      'certificadoManipulacion': new FormControl(null, [Validators.required]),
      'certificadoPazSalvo': new FormControl(false),
      'certificadoExamenes': new FormControl(false),
    });

    activateRoute.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'nuevo') {
        this.cargarConductor(id);
      }
    });
  }

  ngOnInit() {
    this._hospitalService.cargarHospitales().subscribe(hospitales => this.hospitales = hospitales);

    this._modalUploadService.notificacion
      .subscribe(res => {
        // console.log(res);
        this.conductor.img = res.conductor.img;
      });
  }

  cargarConductor(id: string) {
    this._conductorService.cargarConductor(id).subscribe( conductor => {
      this.conductor = conductor;
      this.cargarForma();
      // this.conductor.vehiculo = conductor.vehiculo._id;
      this.cambioVehiculo(this.conductor.vehiculo);
    });
  }

  cargarForma() {
    this.forma.controls['_id'].setValue(this.conductor._id);
    this.forma.controls['cedula'].setValue(this.conductor.cedula);
    this.forma.controls['nombres'].setValue(this.conductor.nombres);
    this.forma.controls['apellidos'].setValue(this.conductor.apellidos);
    this.forma.controls['telefono'].setValue(this.conductor.telefono);
    let fecha = new Date(this.conductor.vencimientoCertificadoManipulacion);
    this.forma.controls['certificadoManipulacion'].setValue(this.dateToString(fecha));
    fecha = new Date(this.conductor.vencimientoLicenciaConduccion);
    this.forma.controls['licenciaConduccion'].setValue(this.dateToString(fecha));
    this.forma.controls['certificadoPazSalvo'].setValue(this.conductor.certificadoPazSalvo);
    this.forma.controls['certificadoExamenes'].setValue(this.conductor.certificadoExamenes);
  }

  actualizarObjeto() {
    this.conductor.cedula = this.forma.controls['cedula'].value;
    this.conductor.nombres = this.forma.controls['nombres'].value;
    this.conductor.apellidos = this.forma.controls['apellidos'].value;
    this.conductor.telefono = this.forma.controls['telefono'].value;
    this.conductor.vencimientoLicenciaConduccion = this.forma.controls['licenciaConduccion'].value;
    this.conductor.vencimientoCertificadoManipulacion = this.forma.controls['certificadoManipulacion'].value;
    this.conductor.certificadoPazSalvo = this.forma.controls['certificadoPazSalvo'].value;
    this.conductor.certificadoExamenes = this.forma.controls['certificadoExamenes'].value;
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

  guardarConductor() {
    if (this.forma.invalid) {
      return;
    }
    this.actualizarObjeto();
    this._conductorService.guardarConductor(this.conductor).subscribe(conductor => {
      this.conductor._id = conductor._id;
      this.router.navigate(['/conductor', conductor._id]);
    });
  }

  cambioVehiculo(id: string) {
    return;
    // this._hospitalService.obtenerHospital(id).subscribe(hospital => {
    //   this.hospital = hospital;
    // });
  }

  cambiarImagen() {
    this._modalUploadService.mostarModal('conductores', this.conductor._id);
  }

}
