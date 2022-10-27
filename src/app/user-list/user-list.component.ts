import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, Observable, Subject, takeUntil } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private route:ActivatedRoute,private service:UsersService) {
    console.log("inside constructor of UserListComponent");
   }

   public userList$:Observable<any>=new Observable();
   public title:string="";
   private destroy$=new Subject<any>();

  ngOnInit(): void {
    console.log("Inside ngOnInit of UserListComponent");
    this.title=this.route.snapshot.data['pageTitle'];
     this.userList$=this.service.getUsers();
  }

  
  // navigate(){
  //   this.router.navigate(['/test3']);
  // }


  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.complete()
  }

}
