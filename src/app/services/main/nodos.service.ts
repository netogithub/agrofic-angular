import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { GLOBAL } from "../global"

@Injectable({
  providedIn: 'root'
})
export class NodosService {
  public url!: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  SearchNodos(token: string, id_sitio: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'nodos-search/' + id_sitio, { headers: headers });
  }

  listNodos(token: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'nodos', { headers: headers });
  }

  createNodos(token: string) {
    //
  }

  readNodos(token: string) {
    //
  }

  updateNodos(token: string) {
    //
  }

  deleteNodos(token: string) {
    //
  }
}
