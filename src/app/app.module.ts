import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {DecimalPipe} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/auth/login/login.component';

// Error Components
import { NotfoundComponent } from './components/error/notfound/notfound.component';

// Include Components
import { FooterComponent } from './components/include/footer/footer.component';
import { NavsidebarComponent } from './components/include/navsidebar/navsidebar.component';
import { NavtopbarComponent } from './components/include/navtopbar/navtopbar.component';

// Main Components
import { DashboardComponent } from './components/main/dashboard/dashboard.component';
import { PlantacionesComponent } from './components/main/catalogos/plantaciones/plantaciones.component';
import { CultivosComponent } from './components/main/catalogos/cultivos/cultivos.component';
import { SuelosComponent } from './components/main/catalogos/suelos/suelos.component';
import { RiegosComponent } from './components/main/catalogos/riegos/riegos.component';

import { SitiosComponent } from './components/main/sitios/sitios.component';
import { NodosComponent } from './components/main/nodos/nodos.component';
import { SensoresComponent } from './components/main/sensores/sensores.component';
import { NodoSensorComponent } from './components/main/relaciones/nodo-sensor/nodo-sensor.component';
import { SitioUsuarioComponent } from './components/main/relaciones/sitio-usuario/sitio-usuario.component';
import { UsuariosComponent } from './components/main/usuarios/usuarios.component';

import { PlantacionesSortableHeader } from './components/main/catalogos/plantaciones/plantaciones.sortdir';
import { CultivosSortableHeader } from './components/main/catalogos/cultivos/cultivos.sortdir';
import { RiegosSortableHeader } from './components/main/catalogos/riegos/riegos.sortdir';
import { SuelosSortableHeader } from './components/main/catalogos/suelos/suelos.sortdir';

import { SitiosSortableHeader } from './components/main/sitios/sitios.sortdir';
import { NodosSortableHeader } from './components/main/nodos/nodos.sortdir';
import { SensoresSortableHeader } from './components/main/sensores/sensores.sortdir';
import { UsuariosSortableHeader } from './components/main/usuarios/usuarios.sortdir';

import { IdentidadService } from 'src/app/services/auth/identidad.service';
import { IdentidadGuard } from './services/auth/identidad.guard';
import { AdminGuard } from './services/auth/admin.guard';
import { SortIconComponent } from './components/include/sort-icon/sort-icon.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotfoundComponent,
    FooterComponent,
    NavsidebarComponent,
    NavtopbarComponent,
    DashboardComponent,
    PlantacionesComponent,
    PlantacionesSortableHeader,
    CultivosComponent,
    CultivosSortableHeader,
    SuelosComponent,
    SuelosSortableHeader,
    RiegosComponent,
    RiegosSortableHeader,
    SitiosComponent,
    SitiosSortableHeader,
    NodosComponent,
    NodosSortableHeader,
    SensoresComponent,
    SensoresSortableHeader,
    NodoSensorComponent,
    SitioUsuarioComponent,
    UsuariosComponent,
    UsuariosSortableHeader,
    SortIconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
  ],
  providers: [DecimalPipe, IdentidadService, IdentidadGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
