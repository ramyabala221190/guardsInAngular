import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.scss']
})
export class Test2Component implements OnInit {

  constructor(private activeRoute:ActivatedRoute) {
    console.log("inside constructor of Test2Component")
  }

  public test2Form=new FormGroup({
    name:new FormControl(""),
    age:new FormControl(0)
  })

  ngOnInit(): void {
    console.log("Inside ngOnInit of Tes2Component");
    this.activeRoute.data.subscribe((result:any)=>{
      console.log(result.todo);
    },
    err=>{
      console.log(err)
    })
  }

  exit(){
    if(!this.test2Form.dirty){
      return true;
    }
    return confirm("Data is not saved. Are you sure you want to exit?")
  }


  ngOnDestroy(){

  }
}
