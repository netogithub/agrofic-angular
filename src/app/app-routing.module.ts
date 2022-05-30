import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { LoginComponent } from './components/auth/login/login.component';
import { NotfoundComponent } from './components/error/notfound/notfound.component';

import { DashboardComponent } from "./components/main/dashboard/dashboard.component";

import { CultivosComponent } from './components/main/catalogos/cultivos/cultivos.component';
import { SuelosComponent } from './components/main/catalogos/suelos/suelos.component';
import { RiegosComponent } from './components/main/catalogos/riegos/riegos.component';
import { PlantacionesComponent } from './components/main/catalogos/plantaciones/plantaciones.component';

import { SensoresComponent } from './components/main/sensores/sensores.component';
import { NodosComponent } from './components/main/nodos/nodos.component';
import { SitiosComponent } from './components/main/sitios/sitios.component';
import { UsuariosComponent } from './components/main/usuarios/usuarios.component';

import { IdentidadGuard } from './services/auth/identidad.guard';
import { AdminGuard } from './services/auth/admin.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: DashboardComponent, canActivate: [IdentidadGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [IdentidadGuard]},
  {path: 'cultivos', component: CultivosComponent, canActivate: [AdminGuard]},
  {path: 'suelos', component: SuelosComponent, canActivate: [AdminGuard]},
  {path: 'riegos', component: RiegosComponent, canActivate: [AdminGuard]},
  {path: 'plantaciones', component: PlantacionesComponent, canActivate: [AdminGuard]},
  {path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuard]},
  {path: 'sitios', component: SitiosComponent, canActivate: [AdminGuard]},
  {path: 'nodos', component: NodosComponent, canActivate: [AdminGuard]},
  {path: 'sensores', component: SensoresComponent, canActivate: [AdminGuard]},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
