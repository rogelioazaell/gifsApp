import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  constructor( private gifsService: GifsService) { }

  get historial() {
    return this.gifsService.historial;
  }

  buscar(elemento: string) {
    this.gifsService.buscarGifs(elemento);
  }

}
