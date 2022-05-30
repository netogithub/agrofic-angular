import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { GLOBAL } from "../../global"

@Injectable({
  providedIn: 'root'
})
export class SitioUsuarioService {
  public url!: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  searchSitioUsuario(token: string, id_usuario: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'monitoreo-fecha/' + id_usuario, { headers: headers });
  }

  listSitioUsuario(): void {
    //
  }

  createSitioUsuario(): void {
    //
  }

  readSitioUsuario(): void {
    //
  }

  updateSitioUsuario(): void {
    //
  }

  deleteSitioUsuario(): void {
    //
  }
}
