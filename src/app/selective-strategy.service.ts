import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn:'root'
})

export class CustomPreloadStrategy implements PreloadingStrategy{
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    if(route.data && route.data['preload']){
      //preload the lazy feature module only if the route has a data property as below:
      // data:{preload:true}
      return fn();
    }
    return of(null)
  }

}
