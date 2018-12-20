import { Component, OnInit } from '@angular/core';

// De esta manera se puede llamar cualquier script que se encuentre fuera de angular en un archivo js
declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
