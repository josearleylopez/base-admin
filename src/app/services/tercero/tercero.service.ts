import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, filter } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Tercero } from '../../models/tercero.model';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class TerceroService {

  totalTerceros: number = 0;
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarTerceros() {
    const url = URL_SERVICIOS + '/tercero';
    return this.http.get(url).pipe(map((res: any) => {
      this.totalTerceros = res.total;
      return res.terceros;
    }));
  }

  buscarTerceros(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/terceros/' + termino;
    return this.http.get(url).pipe(map((res: any) => res.terceros));
  }

  cargarTercero(id: string) {
    const url = URL_SERVICIOS + '/tercero/' + id;
    return this.http.get(url).pipe(map((res: any) => {
      return res.tercero;
    }));
  }

  borrarTercero(id: string) {
    let url = URL_SERVICIOS + '/tercero/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url).pipe(map(res => {
      swal('Operacion exitosa', 'El tercero ha sido borrado', 'success');
      return true;
    }));

  }

  guardarTercero(tercero: Tercero) {
    let url = URL_SERVICIOS + '/tercero';

    if (tercero._id) {
      // Actualizando
      url += '/' + tercero._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, tercero).pipe(map((res: any) => {
        swal('Tercero actualizado', tercero.razonSocial, 'success');
        return res.tercero;
      }));
    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;
      console.log(tercero);
      return this.http.post(url, tercero).pipe(map((res: any) => {
        swal('Tercero creado', tercero.razonSocial, 'success');
        return res.tercero;
      }));
    }
  }

  actualizarTercero(tercero: Tercero) {
    let url = URL_SERVICIOS + '/tercero/' + tercero._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put(url, tercero).pipe(map((res: any) => {
      swal('Tercero actualizado', tercero.razonSocial, 'success');
      return res.tercero;
    }));
  }

}
