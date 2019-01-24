import { Component, OnInit } from '@angular/core';
import { Conductor } from 'src/app/models/conductor.model';
import { ConductorService, ModalUploadService } from 'src/app/services/service.index';

declare var swal: any;


@Component({
  selector: 'app-conductores',
  templateUrl: './conductores.component.html',
  styles: []
})
export class ConductoresComponent implements OnInit {

  conductores: Conductor[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _conductorService: ConductorService,
    public _modalUploadService: ModalUploadService
    ) { }

  ngOnInit() {
    this.cargarConductores();
    // Estoy pendiente de los cambios que se hagan en el modal
    this._modalUploadService.notificacion.subscribe(() => this.cargarConductores());
  }

  cargarConductores() {
    this.cargando = true;
    this._conductorService.cargarConductores(this.desde)
      .subscribe((res: any) => {
        this.conductores = res;
        this.cargando = false;
      });
  }

  cambiarInicio(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarConductores();
  }

  buscarConductores(termino: string) {
    if (termino.length <= 0) {
      this.cargarConductores();
      return;
    }
    this.cargando = true;
    this._conductorService.buscarConductores(termino).subscribe((conductores: Conductor[]) => {
      this.conductores = conductores;
      this.cargando = false;
    });
  }

  borrarConductor(conductor: Conductor) {
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + conductor.nombres + ' ' + conductor.apellidos,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      console.log(borrar);
      if (borrar) {
        this._conductorService.borrarConductor(conductor._id).subscribe( borrado => {
          console.log(borrado);
          this.cargarConductores();
        });
      }
    });

  }

  guardarConductor(conductor: Conductor) {
    this._conductorService.actualizarConductor(conductor).subscribe();
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostarModal('conductores', id);
  }

}
