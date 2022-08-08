import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteDeactiveGuard implements CanActivate, CanDeactivate<unknown>,CanLoad {
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   console.log(`canLoad guard executed for ${route.path}`)
    return true;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(`canActivate guard executed for ${route.url}`)
      //check if component can be activated.
      return true;
  }
  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //check if component can be destroyed.
      console.log(`canDeactivate guard executed for ${currentRoute.url}`)
      return component.exit();
  }

}
