import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverAService implements Resolve<any> {

  constructor(private http:HttpClient,private service:UsersService) {

   }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any> {
    console.log("executing resolver for component");
    const userId=route.paramMap.get('id') || 0;
    return this.service.getUser(+userId).pipe(
      map(user=>{
        return {user:user,error:null}
      }),
      catchError(err=>{
        return of({user:null,error:err})
      })
    ) //+ is for typecasting to number
  }
}
