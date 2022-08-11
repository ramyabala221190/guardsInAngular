import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from '../test/test.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RouteDeactiveGuard } from '../route-deactive.guard';

const routes:Routes=[
  {
    path:"",
    component:TestComponent,
    canActivateChild:[RouteDeactiveGuard],
    canDeactivate:[RouteDeactiveGuard]
  }
]

@NgModule({
  declarations: [TestComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ModAModule { }
