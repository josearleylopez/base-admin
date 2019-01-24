import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, filter } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Conductor } from '../../models/conductor.model';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  totalConductores: number = 0;
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarConductores(desde: number = 0) {
    const url = URL_SERVICIOS + '/conductor?desde=' + desde;
    return this.http.get(url).pipe(map((res: any) => {
      this.totalConductores = res.total;
      return res.conductores;
    }));
  }

  buscarConductores(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/conductores/' + termino;
    return this.http.get(url).pipe(map((res: any) => res.conductores));
  }

  cargarConductor(id: string) {
    const url = URL_SERVICIOS + '/conductor/' + id;
    return this.http.get(url).pipe(map((res: any) => {
      return res.conductor;
    }));
  }

  borrarConductor(id: string) {
    let url = URL_SERVICIOS + '/conductor/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url).pipe(map(res => {
      swal('Operacion exitosa', 'El conductor ha sido borrado', 'success');
      return true;
    }));

  }

  guardarConductor(conductor: Conductor) {
    let url = URL_SERVICIOS + '/conductor';

    if (conductor._id) {
      // Actualizando
      console.log(conductor);
      url += '/' + conductor._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, conductor).pipe(map((res: any) => {
        swal('Conductor actualizado', conductor.nombres + ' ' + conductor.apellidos, 'success');
        return res.conductor;
      }));
    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;
      console.log(conductor);
      return this.http.post(url, conductor).pipe(map((res: any) => {
        swal('Tercero creado', conductor.nombres + ' ' + conductor.apellidos, 'success');
        return res.conductor;
      }));
    }
  }

  actualizarConductor(conductor: Conductor) {
    let url = URL_SERVICIOS + '/conductor/' + conductor._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put(url, conductor).pipe(map((res: any) => {
      swal('Tercero actualizado', conductor.nombres + ' ' + conductor.apellidos, 'success');
      return res.conductor;
    }));
  }

}
