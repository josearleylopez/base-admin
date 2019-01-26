import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../models/vehiculo.model';
import { VehiculoService, ModalUploadService } from '../../services/service.index';

declare var swal: any;

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styles: []
})
export class VehiculosComponent implements OnInit {

  vehiculos: Vehiculo[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _vehiculoService: VehiculoService,
    public _modalUploadService: ModalUploadService
    ) { }

  ngOnInit() {
    this.cargarVehiculos();
    // Estoy pendiente de los cambios que se hagan en el modal
    this._modalUploadService.notificacion.subscribe(() => this.cargarVehiculos());
  }

  cargarVehiculos() {
    this.cargando = true;
    this._vehiculoService.cargarVehiculos(this.desde)
      .subscribe((res: any) => {
        this.vehiculos = res;
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
    this.cargarVehiculos();
  }

  buscarVehiculos(termino: string) {
    if (termino.length <= 0) {
      this.cargarVehiculos();
      return;
    }
    this.cargando = true;
    this._vehiculoService.buscarVehiculos(termino).subscribe((vehiculos: Vehiculo[]) => {
      this.vehiculos = vehiculos;
      this.cargando = false;
    });
  }

  borrarVehiculo(vehiculo: Vehiculo) {
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + vehiculo.placa,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._vehiculoService.borrarVehiculo(vehiculo._id).subscribe( borrado => {
          this.cargarVehiculos();
        });
      }
    });

  }

  guardarVehiculo(vehiculo: Vehiculo) {
    this._vehiculoService.actualizarVehiculo(vehiculo).subscribe();
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostarModal('vehiculos', id);
  }
}
