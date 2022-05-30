import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { GLOBAL } from "../../global"

@Injectable({
  providedIn: 'root'
})
export class NodoSensorService {
  public url!: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  searchNodoSensor(token: string, id_nodo: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'search-nodo-sensor/' + id_nodo, { headers: headers });
  }

  listNodoSensor(): void {
    //
  }

  createNodoSensor(): void {
    //
  }

  readNodoSensor(): void {
    //
  }

  updateNodoSensor(): void {
    //
  }

  deleteNodoSensor(): void {
    //
  }
}
