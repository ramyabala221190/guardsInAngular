import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  public initialUser=[{
    id:0,
    name:"",
    email:""
  }]

  getUsers(){
return this.http.get("https://jsonplaceholder.typicode.com/users").pipe(catchError(err=>throwError(err)))
  }

  getUser(userId:number){
    if(userId === 0){
     return of(this.initialUser)
    }
    else{
    return this.http.get(`https://jsonplaceholder.typicode.com/users?id=${userId}`).pipe(catchError(err=>throwError(err)))
    }
  }

}
