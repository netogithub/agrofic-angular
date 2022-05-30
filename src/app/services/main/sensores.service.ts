import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { GLOBAL } from "../global"

@Injectable({
  providedIn: 'root'
})
export class SensoresService {
  public url!: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  listSensores(token: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'sensores', { headers: headers });
  }

  createSensores() {
    //
  }

  readSensores() {
    //
  }

  updateSensores() {
    //
  }

  deleteSensores() {
    //
  }
}
