import { Component, OnInit } from '@angular/core';
import { Ruta } from '../../models/ruta.model';
import { RutaService } from '../../services/service.index';

declare var swal: any;

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styles: []
})
export class RutasComponent implements OnInit {

  rutas: Ruta[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _rutaService: RutaService,
    ) { }

  ngOnInit() {
    this.cargarRutas();
  }

  cargarRutas() {
    this.cargando = true;
    this._rutaService.cargarRutas(this.desde)
      .subscribe((res: any) => {
        this.rutas = res;
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
    this.cargarRutas();
  }

  buscarRutas(termino: string) {
    if (termino.length <= 0) {
      this.cargarRutas();
      return;
    }
    this.cargando = true;
    this._rutaService.buscarRutas(termino).subscribe((rutas: Ruta[]) => {
      this.rutas = rutas;
      this.cargando = false;
    });
  }

  borrarRuta(ruta: Ruta) {
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + ruta.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._rutaService.borrarRuta(ruta._id).subscribe( borrado => {
          this.cargarRutas();
        });
      }
    });

  }

  guardarRuta(ruta: Ruta) {
    this._rutaService.actualizarRuta(ruta).subscribe();
  }

}
