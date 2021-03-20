import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService){

  }

  canActivate(): boolean {
    if(this.authService.isAuthenticated()){
      return true;
    } else {
      this.authService.login();
      return true;
    }
   }

  // canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
  //   throw new Error("Method not implemented.");
  // }
  
}


