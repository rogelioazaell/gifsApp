import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIF } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '4g5t6L1wz9aIjkbXJGXedgq2l5dgG6Xx';
  private servicioUrlGifs: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  
  // todo cambier any por su tipo.
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {

    // Opcion 1:   
    // if (localStorage.getItem('gifHistorial')) {
    //   // la funcion parse, permite des-serializar un json a un objeto.
    //   // ! = significa que puede ser nullo.
    //   this._historial = JSON.parse(localStorage.getItem('gifHistorial')!);
    // }
    //Opcion 2:
    this._historial = JSON.parse(localStorage.getItem('gifHistorial')!) || [];
    
    // obetener resultados 
    if( localStorage.getItem('gifResultados')) {
      this.resultados = JSON.parse(localStorage.getItem('gifResultados')!);
    }

  }

  buscarGifs( query: string) {

    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)) {
      this._historial.unshift(query);
      // regresar solamente 10 elementos.
      this._historial = this._historial.splice(0, 10);
      // persistir los resultados de la busqueda en el localstorage
      // se utilizo la funcion stringify, para poder grabar un string en el localstorage, 
      // ya que el _historial es un objeto y no permite grabar objetos.
      localStorage.setItem('gifHistorial', JSON.stringify(this._historial));
    }
    
    // manejando el modulo de http, para trabajar con observables que es propio de RXJS.
    // se recomienda definir el tipado en el GET, porque un GET es de tipo generico. 
    // this.http.get<SearchGIF>(`https://api.giphy.com/v1/gifs/search?api_key=4g5t6L1wz9aIjkbXJGXedgq2l5dgG6Xx&q=${query}&limit=10`)
    //   .subscribe((respuesta) => {
    //     console.log(respuesta.data);
    //     this.resultados = respuesta.data;
    //     localStorage.setItem('gifResultados', JSON.stringify(this.resultados));
    //   });

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('q', query)
          .set('limit', '10');

    this.http.get<SearchGIF>(`${this.servicioUrlGifs}/search`, {params})
      .subscribe((respuesta) => {
        this.resultados = respuesta.data;
        localStorage.setItem('gifResultados', JSON.stringify(this.resultados));
      }); 
    

  }
}
