import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { IdentidadService } from "src/app/services/auth/identidad.service";
import { Identidad } from "src/app/models/auth/identidad.model";

@Injectable()
export class AdminGuard implements CanActivate {
  private identidad!: Identidad;

  constructor(
    private _router: Router,
    private _identidadSevice: IdentidadService
  ) {
    this.identidad = this._identidadSevice.getIdentity();
  }

  /*canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      //
  }*/

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let identidad = this._identidadSevice.getIdentity();
    if (identidad && identidad.tipo_usuario == "1") {
      return true;
    } else {
      this._router.navigate(['/dashboard']);
      return false;
    }
  }
}
