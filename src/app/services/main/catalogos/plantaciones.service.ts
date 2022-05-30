import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { GLOBAL } from "../../global"

@Injectable({
  providedIn: 'root'
})
export class PlantacionesService {
  public url!: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  listPlantaciones(token: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'plantaciones', { headers: headers });
  }

  createPlantaciones(token: string) {
    //
  }

  readPlantaciones(token: string) {
    //
  }

  updatePlantaciones(token: string) {
    //
  }

  deletePlantaciones(token: string) {
    //
  }
}
