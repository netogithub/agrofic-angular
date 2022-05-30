import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { GLOBAL } from 'src/app/services/global';

import { SitiosService } from 'src/app/services/main/sitios.service';
import { Sitio } from 'src/app/models/sitio.model';
import { NodosService } from 'src/app/services/main/nodos.service';
import { Nodo } from 'src/app/models/nodo.model';
import { IdentidadService } from 'src/app/services/auth/identidad.service';
import { Monitoreo } from 'src/app/models/monitoreo.model';
import { NodoSensorService } from 'src/app/services/main/relaciones/nodo-sensor.service';
import { NodoSensor } from 'src/app/models/relaciones/nodo-sensor-model';
import { MonitoreoService } from 'src/app/services/main/monitoreo.service';
import { NgForm } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public listaSitios!: Sitio[];
  public listaNodos!: Nodo[];
  public listaNodoSensor!: NodoSensor[];
  public listaMonitoreo!: Monitoreo[];
  public formulario!: Monitoreo;
  public date!: any;
  public token!: string;
  @ViewChild('myAreaChart') myAreaChart!: ElementRef<HTMLCanvasElement>
  public chart!: Chart

  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;

  constructor(
    private _router: Router,
    private _sitiosService: SitiosService,
    private _nodosService: NodosService,
    private _nodoSensorService: NodoSensorService,
    private _monitoreoService: MonitoreoService,
    private _identidadService: IdentidadService
  ) {
    this.token = _identidadService.getToken();
    this.formulario = new Monitoreo("", "", "", "", "", "", "", "", "", "", "");
  }

  ngOnInit(): void {
    if (!localStorage.getItem(GLOBAL.identity)) {
      this._router.navigate(['/login']);
    }
    this.listSitios();
  }

  selectTest(form: NgForm): void {
    console.log(form.value.sensor);
  }

  listSitios(): void {
    this._sitiosService.listaSitios(this.token).subscribe(
      res => {
        this.listaSitios = res;
        console.log(this.listaSitios);
        //this.searchNodos(this.listaSitios[0].id_sitio);
      },
      err => {
        console.log(err);
      }
    );
  }

  searchNodos(id_sitio: string): void {
    console.log(id_sitio);
    if (id_sitio) {
      this._nodosService.SearchNodos(this.token, id_sitio).subscribe(
        res => {
          this.listaNodos = res;
          console.log(this.listaNodos);
          // this.searchNodoSensor(this.listaNodos[0].id_nodo)
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  searchNodoSensor(id_nodo: string): void {
    this._nodoSensorService.searchNodoSensor(this.token, id_nodo).subscribe(
      res => {
        this.listaNodoSensor = res;
        console.log(this.listaNodoSensor);
      },
      err => {
        console.log(err);
      }
    );
  }

  searchMonitoreo(test: string): void {
    console.log(this.date);
    let dia = this.date.day;
    if (this.date.day < 10) {
      dia = '0' + this.date.day;
    }
    console.log(dia);
    let mes = this.date.month;
    if (this.date.month < 10) {
      mes = '0' + this.date.month;
    }
    console.log(mes);
    let date = this.date.year + '-' + this.date.month + '-' + this.date.day;
    console.log(date);
    let fecha = this.date.year + '-' + mes + '-' + dia;
    console.log(fecha);
    this.formulario.fecha = fecha;
    this.formulario.id_nodo_sensor = test;
    console.log(this.formulario);
    this._monitoreoService.searchMonitoreo(this.token, this.formulario).subscribe(
      res => {
        this.listaMonitoreo = res;
        console.log(this.listaMonitoreo);
        this.formulario = new Monitoreo("", "", "", "", "", "", "", "", "", "", "");
        this.llnearGrafica();
      },
      err => {
        console.log(err);
      }
    );
  }

  llnearGrafica() {
    var dataMonitoreo: number[] = Array(this.listaMonitoreo.length);
    var labelMonitoreo: string[] = Array(this.listaMonitoreo.length);
    for (let i = 0; i < this.listaMonitoreo.length; i++) {
      dataMonitoreo.push(parseInt(this.listaMonitoreo[i].tension));
      labelMonitoreo.push(this.listaMonitoreo[i].hora);
      //labelMonitoreo.push(i.toString());
    }

    this.chart = new Chart(this.myAreaChart.nativeElement, {
      type: 'line',
      data: {
        labels: labelMonitoreo,
        datasets: [{
          label: 'My First Dataset',
          data: dataMonitoreo,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    })
  }

}
