import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {


 constructor(private route:ActivatedRoute){}
 ngOnInit(): void {
 
 }
  ngOnDestroy(){

  }
}
