import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';

import { CreateEmployeeComponent } from './create-employee.component';
import { DeleteEmployeeComponent } from './delete-employee.component';
import { ListEmployeesComponent } from './list-employees.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    CreateEmployeeComponent,
    DeleteEmployeeComponent,
    ListEmployeesComponent
  ]
 
})
export class EmployeeModule { }
