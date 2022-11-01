import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message.component';
import { RouterModule } from '@angular/router';

export const routes=[
  {
    path:'',
    component:MessageComponent,
  }
]


@NgModule({
  declarations: [MessageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MessageModule { }
