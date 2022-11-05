import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RouteDeactiveGuard } from '../route-deactive.guard';
import { UserListComponent } from '../user-list/user-list.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { ResolverAService } from '../resolver-a.service';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { UserEditInfoComponent } from '../user-edit-info/user-edit-info.component';
import { UserEditTagsComponent } from '../user-edit-tags/user-edit-tags.component';


const routes:Routes=[
  {
    path:"list",
    canActivate:[RouteDeactiveGuard],
    /*this is used in case of a scenario when the user logs off
    and wants to log in again. The canLoad guard wont re-execute. The feature module is already downloaded.
    So we just add the can Activate guard to guard the child routes if the user logs in after a log off.
    But the first time the feature module will load, the canLoad guard will execute.
    */
    children:[
      {
        path:"",
        component:UserListComponent,
        data:{pageTitle:"User List"}
      },
      {
        path:":id",
        component:UserDetailComponent,
        data:{pageTitle:"User Detail"},
        resolve:{userData:ResolverAService}
        /*
    You can add multiple resolver services as key value pairs.
    resolve:{data1:service1,data2:service2,.....datan:servicen}
        */
      },
      {
       path:"edit/:id",
       component:UserEditComponent,
      resolve:{userData:ResolverAService},
      children:[
        {
          path:"info",
          component:UserEditInfoComponent,
          canDeactivate:[RouteDeactiveGuard],
        },
        {
        path:"tags",
        component:UserEditTagsComponent
        },
        {
          path:"",redirectTo:"info",pathMatch:"full" //this is to ensure that the info path is activate by default
        }
      ]
      }
    ]
  },
  {path:"",redirectTo:"list",pathMatch:"full"}
]

@NgModule({
  declarations: [UserListComponent,UserEditComponent,UserDetailComponent,UserEditInfoComponent,
    UserEditTagsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ModAModule { }
