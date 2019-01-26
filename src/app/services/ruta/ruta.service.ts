import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, filter } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Ruta } from '../../models/ruta.model';
import swal from 'sweetalert';


@Injectable({
  providedIn: 'root'
})
export class RutaService {

  totalRutas: number = 0;
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarRutas(desde: number = 0) {
    const url = URL_SERVICIOS + '/ruta?desde=' + desde;
    return this.http.get(url).pipe(map((res: any) => {
      this.totalRutas = res.total;
      return res.rutas;
    }));
  }

  buscarRutas(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/rutas/' + termino;
    return this.http.get(url).pipe(map((res: any) => res.rutas));
  }

  cargarRuta(id: string) {
    const url = URL_SERVICIOS + '/ruta/' + id;
    return this.http.get(url).pipe(map((res: any) => {
      return res.ruta;
    }));
  }

  borrarRuta(id: string) {
    let url = URL_SERVICIOS + '/ruta/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url).pipe(map(res => {
      swal('Operacion exitosa', 'La ruta ha sido borrado', 'success');
      return true;
    }));

  }

  guardarRuta(ruta: Ruta) {
    let url = URL_SERVICIOS + '/ruta';

    if (ruta._id) {
      // Actualizando
      console.log(ruta);
      url += '/' + ruta._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, ruta).pipe(map((res: any) => {
        swal('Ruta actualizada', ruta.nombre, 'success');
        return res.ruta;
      }));
    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;
      console.log(ruta);
      return this.http.post(url, ruta).pipe(map((res: any) => {
        swal('Ruta creada', ruta.nombre, 'success');
        return res.ruta;
      }));
    }
  }

  actualizarRuta(ruta: Ruta) {
    let url = URL_SERVICIOS + '/ruta/' + ruta._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put(url, ruta).pipe(map((res: any) => {
      swal('Ruta actualizado', ruta.nombre, 'success');
      return res.ruta;
    }));
  }
  cargarMunicipios(desde: number = 0) {
    const url = URL_SERVICIOS + '/municipio?desde=' + desde;
    return this.http.get(url).pipe(map((res: any) => {
      // this.totalRutas = res.total;
      return res.municipios;
    }));
  }


}
