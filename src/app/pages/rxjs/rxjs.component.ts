import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  suscripcion: Subscription;

  constructor() {

    this.suscripcion = this.regresaObservable()
    .subscribe(
      // next
      numero => console.log('Subs', numero),
      error => console.error('Error en el observable', error),
      () => console.log('El observador terminó!!')
      );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // para la ejecucion del observable
    this.suscripcion.unsubscribe();

  }

  regresaObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo  = setInterval(() => {
        contador += 1;
        const salida = {
          valor: contador
        };
        observer.next(salida);
        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }
        // if (contador === 2) {
        //   // clearInterval(intervalo);
        //   observer.error('Auxilio!!');
        // }
      }, 1000 );
    }).pipe(
      // map funciona como aspersor
      map(resp => {
        return resp.valor;
      }),
      // filter funciona como un interruptor
      filter(( valor, index) => {
        if ((valor % 2) === 1) {
          // el numero es impar
          return true;
        } else {
          // el numero es par
          return false;
        }
      })
    );
  }

}
