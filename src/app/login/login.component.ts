import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UsersService,private router:Router) { }

  loginForm=new FormGroup({
    name:new FormControl("",[Validators.required]),
    password:new FormControl("",[Validators.required])
  })

  ngOnInit(): void {
  }

  login(){
    this.userService.login();
    if(this.userService.redirectUrl){
      this.router.navigateByUrl(this.userService.redirectUrl)
    }
    else{
      this.router.navigate(['/user'])
    }
  }

}
