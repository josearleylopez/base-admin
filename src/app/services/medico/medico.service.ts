import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, filter } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';
import { NG_MODEL_WITH_FORM_CONTROL_WARNING } from '@angular/forms/src/directives';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos() {
    const url = URL_SERVICIOS + '/medico';
    return this.http.get(url).pipe(map((res: any) => {
      this.totalMedicos = res.total;
      return res.medicos;
    }));
  }

  buscarMedicos(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url).pipe(map((res: any) => res.medicos));
  }

  cargarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url).pipe(map((res: any) => {
      return res.medico;
    }));
  }

  borrarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url).pipe(map(res => {
      swal('Operacion exitosa', 'El medico ha sido borrado', 'success');
      return true;
    }));

  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico';

    if (medico._id) {
      // Actualizando
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, medico).pipe(map((res: any) => {
        swal('Medico actualizado', medico.nombre, 'success');
        return res.medico;
      }));
    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, medico).pipe(map((res: any) => {
        swal('Medico creado', medico.nombre, 'success');
        return res.medico;
      }));
    }
  }

  actualizarMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico/' + medico._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put(url, medico).pipe(map((res: any) => {
      swal('Medico actualizado', medico.nombre, 'success');
      return res.medico;
    }));
  }

}
