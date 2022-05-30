import { Component, OnInit } from '@angular/core';
import { IdentidadService } from 'src/app/services/auth/identidad.service';
import { Identidad } from 'src/app/models/auth/identidad.model';

@Component({
  selector: 'app-navsidebar',
  templateUrl: './navsidebar.component.html',
  styleUrls: ['./navsidebar.component.css']
})
export class NavsidebarComponent implements OnInit {
  public identidad!: Identidad;

  constructor(
    private _identidadService: IdentidadService
  ) {
    this.identidad = _identidadService.getIdentity();
  }

  ngOnInit(): void {
  }

}
