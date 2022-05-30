import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { GLOBAL } from "../global"

@Injectable({
  providedIn: 'root'
})
export class SitiosService {
  public url!: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  listaSitios(token: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'sitios', { headers: headers });
  }

  createSitios(token: string) {
    //
  }

  readSitios(token: string) {
    //
  }

  updateSitios(token: string) {
    //
  }

  deleteSitios(token: string) {
    //
  }
}
