import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, filter } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { CentroCosto } from '../../models/centro-costo.model';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class CentroCostoService {

  totalCentrosCosto: number = 0;
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarCentrosCosto(desde: number = 0) {
    const url = URL_SERVICIOS + '/centro-costo?desde=' + desde;
    return this.http.get(url).pipe(map((res: any) => {
      this.totalCentrosCosto = res.total;
      return res.centrosCosto;
    }));
  }

  buscarCentrosCosto(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/centrosCosto/' + termino;
    return this.http.get(url).pipe(map((res: any) => res.centrosCosto));
  }

  cargarCentroCosto(id: string) {
    const url = URL_SERVICIOS + '/centro-costo/' + id;
    return this.http.get(url).pipe(map((res: any) => {
      return res.centroCosto;
    }));
  }

  borrarCentroCosto(id: string) {
    let url = URL_SERVICIOS + '/centro-costo/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url).pipe(map(res => {
      swal('Operacion exitosa', 'El centro costo ha sido borrado', 'success');
      return true;
    }));

  }

  guardarCentroCosto(centroCosto: CentroCosto) {
    let url = URL_SERVICIOS + '/centro-costo';

    if (centroCosto._id) {
      // Actualizando
      console.log(centroCosto);
      url += '/' + centroCosto._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, centroCosto).pipe(map((res: any) => {
        swal('CentroCosto actualizada', centroCosto.nombre, 'success');
        return res.centroCosto;
      }));
    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;
      console.log(centroCosto);
      return this.http.post(url, centroCosto).pipe(map((res: any) => {
        swal('Centro costo creado', centroCosto.nombre, 'success');
        return res.centroCosto;
      }));
    }
  }

  actualizarCentroCosto(centroCosto: CentroCosto) {
    let url = URL_SERVICIOS + '/centro-costo/' + centroCosto._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put(url, centroCosto).pipe(map((res: any) => {
      swal('Centro costo actualizado', centroCosto.nombre, 'success');
      return res.centroCosto;
    }));
  }

}
