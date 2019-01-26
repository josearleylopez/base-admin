import { Component, OnInit } from '@angular/core';
import { CentroCosto } from '../../models/centro-costo.model';
import { CentroCostoService } from '../../services/service.index';

declare var swal: any;

@Component({
  selector: 'app-centros-costo',
  templateUrl: './centros-costo.component.html',
  styles: []
})
export class CentrosCostoComponent implements OnInit {

  centrosCosto: CentroCosto[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _centroCostoService: CentroCostoService,
    ) { }

  ngOnInit() {
    this.cargarCentrosCosto();
  }

  cargarCentrosCosto() {
    this.cargando = true;
    this._centroCostoService.cargarCentrosCosto(this.desde)
      .subscribe((res: any) => {
        this.centrosCosto = res;
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
    this.cargarCentrosCosto();
  }

  buscarCentrosCosto(termino: string) {
    if (termino.length <= 0) {
      this.cargarCentrosCosto();
      return;
    }
    this.cargando = true;
    this._centroCostoService.buscarCentrosCosto(termino).subscribe((centrosCosto: CentroCosto[]) => {
      this.centrosCosto = centrosCosto;
      this.cargando = false;
    });
  }

  borrarCentroCosto(centroCosto: CentroCosto) {
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + centroCosto.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._centroCostoService.borrarCentroCosto(centroCosto._id).subscribe( borrado => {
          this.cargarCentrosCosto();
        });
      }
    });

  }

  guardarCentroCosto(centroCosto: CentroCosto) {
    this._centroCostoService.actualizarCentroCosto(centroCosto).subscribe();
  }

}
