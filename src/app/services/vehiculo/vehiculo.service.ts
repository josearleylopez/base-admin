import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, filter } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Vehiculo } from '../../models/vehiculo.model';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  totalVehiculos: number = 0;
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarVehiculos(desde: number = 0) {
    const url = URL_SERVICIOS + '/vehiculo?desde=' + desde;
    return this.http.get(url).pipe(map((res: any) => {
      this.totalVehiculos = res.total;
      return res.vehiculos;
    }));
  }

  buscarVehiculos(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/vehiculos/' + termino;
    return this.http.get(url).pipe(map((res: any) => res.vehiculos));
  }

  cargarVehiculo(id: string) {
    const url = URL_SERVICIOS + '/vehiculo/' + id;
    return this.http.get(url).pipe(map((res: any) => {
      return res.vehiculo;
    }));
  }

  borrarVehiculo(id: string) {
    let url = URL_SERVICIOS + '/vehiculo/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url).pipe(map(res => {
      swal('Operacion exitosa', 'El vehiculo ha sido borrado', 'success');
      return true;
    }));

  }

  guardarVehiculo(vehiculo: Vehiculo) {
    let url = URL_SERVICIOS + '/vehiculo';

    if (vehiculo._id) {
      // Actualizando
      console.log(vehiculo);
      url += '/' + vehiculo._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, vehiculo).pipe(map((res: any) => {
        swal('Vehiculo actualizado', vehiculo.placa, 'success');
        return res.vehiculo;
      }));
    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;
      console.log(vehiculo);
      return this.http.post(url, vehiculo).pipe(map((res: any) => {
        swal('Vehiculo creado', vehiculo.placa, 'success');
        return res.vehiculo;
      }));
    }
  }

  actualizarVehiculo(vehiculo: Vehiculo) {
    let url = URL_SERVICIOS + '/vehiculo/' + vehiculo._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put(url, vehiculo).pipe(map((res: any) => {
      swal('Vehiculo actualizado', vehiculo.placa, 'success');
      return res.vehiculo;
    }));
  }

}
