import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolverAService implements Resolve<any> {

  constructor(private http:HttpClient) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/500').pipe(
      map(x=>x),
      catchError(err=>throwError(err))
    )
  }
}
