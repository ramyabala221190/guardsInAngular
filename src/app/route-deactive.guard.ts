import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class RouteDeactiveGuard implements CanActivate, CanDeactivate<unknown>,CanLoad,CanActivateChild {

  constructor(private router:Router,private userService:UsersService){}

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //executes only if child route changes
    console.log(`canActivateChild guard executed for ${childRoute}`)
    return true;
  }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   //used for module so that module will not be loaded if guard fails
    console.log(`canLoad guard executed for ${route.path}`);
   const fullPath=segments.reduce((path, currentSegment) => {
    return `${path}/${currentSegment.path}`;
  }, '');
   return this.isAllowed(fullPath)

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(`canActivate guard executed for ${route}`)
      //check if component can be activated.
      return this.isAllowed(state.url);
    }
  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //check if component can be destroyed.
      console.log(`canDeactivate guard executed for ${currentRoute}`)
      return component.exit();
  }

  isAllowed(url?:string){
    console.log(url);
    if(this.userService.getLogInStatus()){
      return true;
    }
    else{
      this.userService.redirectUrl=url || "/";
      this.router.navigate(['/login']);
      return false;
    }
  }

}
