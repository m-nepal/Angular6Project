import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  fullNameLength: number = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
   
    //form builder class to create reactive form
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(10)] ],
      email: [''],
      // nested form group skills
      skills: this.fb.group({
        skillName: [''],
        experienceInYears: [''],
        proficiency: ['beginner']//default value passed 
      })
    });
      // Subscribe to valueChanges observable
      // this.employeeForm.get('fullName').valueChanges.subscribe( value => {
      //     console.log(value);
      //   });

        // Subscribe to FormGroup valueChanges observable
        // this.employeeForm.valueChanges.subscribe(
        //   value => {
        //     console.log(JSON.stringify(value));
        //   }
        // );

    this.employeeForm.get('skills').valueChanges.subscribe((value: any) => {
      console.log(JSON.stringify(value));
    });
  }

  onSubmit(): void {
    console.log(this.employeeForm.touched);
    console.log(this.employeeForm.value);
    console.log(this.employeeForm.controls.fullName.touched);
    console.log(this.employeeForm.get('fullName').value);
  }

  onLoadDataClick(): void {
    this.employeeForm.patchValue({
      fullName: 'Pragim Technologies',
      email: 'pragim@pragimtech.com',
      skills: {
       skillName: 'C#',
       experienceInYears: 5,
       proficiency: 'beginner'
       }
    });
  }
}
