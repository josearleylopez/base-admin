import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: any, tipo: string = 'usuario'): any {
    const url = URL_SERVICIOS + '/img';

    if (!img) {
      return url + '/usuarios/xxxx';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }


    switch (tipo) {
      case 'usuario':
        return url + '/usuarios/' + img;
      case 'conductor':
        return url + '/conductores/' + img;
      case 'vehiculo':
        return url + '/vehiculos/' + img;
      case 'medico':
        return url + '/medicos/' + img;
      case 'hospital':
        return url + '/hospitales/' + img;
      default:
        console.log('Tipo de imagen no existe, usuario, medico, hospital');
        return url + '/usuarios/xxxx';
    }
  }

}
