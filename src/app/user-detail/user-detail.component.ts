import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }

  public userDetail$=new Observable<any>();
  public pageTitle:string="";
  private errSub$=new Subject<any>();
  public errObsv$=this.errSub$.asObservable()

  ngOnInit(): void {
    this.pageTitle=this.route.snapshot.data['pageTitle'];
    this.userDetail$=this.route.data.pipe(
      delay(0), //to avoid expression changed errors
      map((user:any)=>{
        console.log(user);
        if(user.userData.error){
          this.errSub$.next(user.userData.error)
        }
        return user.userData.user;  
      })
    )
  }

  deleteUser(userId:number){
    console.log(userId)
   }

}
