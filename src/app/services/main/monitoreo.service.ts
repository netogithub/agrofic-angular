import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { GLOBAL } from "../global"
import { Monitoreo } from 'src/app/models/monitoreo.model';

@Injectable({
  providedIn: 'root'
})
export class MonitoreoService {
  public url!: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  searchMonitoreo(token: string, monitoreo: Monitoreo): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    let json = JSON.stringify(monitoreo);
    return this._http.post(this.url + 'monitoreo-fecha', json, { headers: headers });
  }

  createMonitoreo() {
    //
  }

  readMonitoreo() {
    //
  }

  updateMonitoreo() {
    //
  }

  deleteMonitoreo() {
    //
  }
}
