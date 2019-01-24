import { Component, OnInit } from '@angular/core';
import { Tercero } from '../../models/tercero.model';
import { TerceroService } from 'src/app/services/service.index';

@Component({
  selector: 'app-terceros',
  templateUrl: './terceros.component.html',
  styles: []
})
export class TercerosComponent implements OnInit {

  terceros: Tercero[] = [];


  constructor(
    public _terceroService: TerceroService
  ) { }

  ngOnInit() {
    this.cargarTerceros();
  }

  cargarTerceros() {
    this._terceroService.cargarTerceros().subscribe(terceros => this.terceros = terceros);
  }

  buscarTercero(termino: string) {
    if (termino.length <= 0) {
      this.cargarTerceros();
      return;
    }
    this._terceroService.buscarTerceros(termino).subscribe( terceros => {
      this.terceros = terceros;
    });

  }

  crearTercero() {

  }

  borrarTercero(tercero: Tercero) {
    this._terceroService.borrarTercero(tercero._id).subscribe(() => this.cargarTerceros());
  }

}
