import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() leyenda: string = 'Leyenda';
  @Input() progreso: number = 10;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    console.log('Leyenda en constructor', this.leyenda);
    console.log('Progreso en constructor', this.progreso);
  }

  ngOnInit() {
    console.log('Leyenda en constructor', this.leyenda);
    console.log('Progreso en constructor', this.progreso);
  }

  cambiarValor(valor: number) {

    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }
    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }
    this.progreso += valor;
    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();

  }

  onChanges(newValor) {
    // Para corregir que se muestre valores entre 0 y 100 en la caja
    // La siguiente linea es javascript
    // let elementHTML: any = document.getElementsByName('progreso')[0];
    if (newValor > 100) {
      this.progreso = 100;
    } else if (newValor < 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValor;
    }
    // elementHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
  }
}
