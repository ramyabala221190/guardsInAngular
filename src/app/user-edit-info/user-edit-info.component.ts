import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable, delay, map, startWith } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-edit-info',
  templateUrl: './user-edit-info.component.html',
  styleUrls: ['./user-edit-info.component.scss']
})
export class UserEditInfoComponent implements OnInit {

  constructor(private route:ActivatedRoute,private service:UsersService) {
    console.log("inside constructor of UserEditInfoComponent")
  }

  public userEditForm=new FormGroup({
    name:new FormControl("",[Validators.required]),
    email:new FormControl("",[Validators.required]),
    id:new FormControl(0)
  })

  public userId:number=0;
  private errSub$=new Subject<any>();
  public errObsv$=this.errSub$.asObservable();
  public userDetail$=new Observable<any>();

  ngOnInit(): void {
    /*
If i am editing a user and then i click on Add user button, it has to navigate to the same
component. But the ngOnInit wont execute again.
This means if the value of userId is obtained from snapshot then it wont update.
In such cases you need to switch to observable approach of getting route params.
Why is it necessary for userId to update?
In the template the button is either Update or Create based on the value of userId.
    */
    console.log("Inside ngOnInit of UserEditComponent");
    //this.userId=+(this.route.snapshot.paramMap.get('id') || 0) ---->snapshot approach

    //observable approach
    this.route.paramMap.subscribe(params=>{
      this.userId=+(params.get('id') || 0)
    })
    if(this.route.parent){
    this.userDetail$=this.route.parent.data.pipe(
      delay(0), //to avoid expression changed errors
      map((user:any)=>{
        console.log(user)
        if(user.userData.error){
          this.errSub$.next(user.userData.error)
        }
        if(user.userData.user){
          this.userEditForm.reset(); //resets the validation status of the form
        this.userEditForm.get('name')?.patchValue(user.userData.user[0].name);
        this.userEditForm.get('email')?.patchValue(user.userData.user[0].email);
        this.userEditForm.get('id')?.patchValue(user.userData.user[0].id);
        }
        return user.userData.user;
      })
    )
    }
  }

  editUser(){
    console.log(this.userEditForm.value)
  }

  createUser(){
    console.log(this.userEditForm.value)
  }

  exit(){
    if(!this.userEditForm.dirty){
      return true;
    }
    return confirm("Data is not saved. Are you sure you want to exit?")
  }



}
