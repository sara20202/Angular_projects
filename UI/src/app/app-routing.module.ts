import { NgModule } from '@angular/core';

import {EmployeeComponent} from "./employee/employee.component";
import {DepartmentComponent} from "./department/department.component";
import {Routes,RouterModule} from "@angular/router";


const routs:Routes=[
  {path:'employee',component:EmployeeComponent},
  {path:'department',component:DepartmentComponent}
];
@NgModule({
  declarations: [],
  imports: [   RouterModule.forRoot(routs)  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
