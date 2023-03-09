import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  // El operador !, es para asegurase que un objeto no es nullo. 
  // TypeScriptLang.org - Not-Null-Assertion-Operator
  // cuando TypeScript no reconozca algun valor, entonces si hay que importar estos tipados especificos
  // como el HTMLInputElement.
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService : GifsService) {};

  buscar () {
    
    const valor = this.txtBuscar.nativeElement.value;

    if ( valor.trim().length == 0) {
      return;
    }

    this.gifsService.buscarGifs(valor);

    this.txtBuscar.nativeElement.value = '';
  }


}
