import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from './employee.service';
import { IEmployee } from './IEmployee';
import { ISkill } from './ISkill';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employee : IEmployee;
  employeeForm: FormGroup;
  fullNameLength: number = 0;
  pageTitle: string;
  // Notice, each key in this object has the same name as the corresponding form control
  formErrors = {};
  // This object contains all the validation messages for this form
  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 10 characters.'
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email domain should be dell.com'
    },
    'confirmEmail': {
      'required': 'Confirm Email is required.'
    },
    'emailGroup': {
      'emailMismatch': 'Email and Confirm Email do not match',
    },
    'phone': {
      'required': 'Phone is required.'
    }
    
  };

  constructor(private fb: FormBuilder, 
              private route: ActivatedRoute,
              private employeeService : EmployeeService,
              private router: Router,
            ) { }

  ngOnInit() {
    //form builder class to create reactive form
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreference: ['email'],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, CustomValidators.emailDomain('dell.com')]],
        confirmEmail: ['', Validators.required],
      }, { validator: matchEmail }),
      phone: [''],
      // nested form group skills
      skills: this.fb.array([
            this.addSkillFormGroup()
      ])
    });

    this.employeeForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      this.onContactPrefernceChange(data);
    });

    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });

    this.route.paramMap.subscribe(params => {
      const empId = +params.get('id');
      if(empId){
        this.getEmployee(empId);
        this.pageTitle = "Edit Employee";
      }else{
        this.employee = {
          id: null,
          fullName: '',
          contactPreference: '',
          email: '',
          phone: null,
          skills: []
        };
        this.pageTitle = "Create Employee";
      }
    })

  }//ng oninit

  getEmployee(id: number ){
    this.employeeService.getEmployee(id)
    .subscribe(
      (employee: IEmployee) => {
        // Store the employee object returned by the
        // REST API in the employee property
        this.employee = employee;
        this.editEmployee(employee);
      },
      (err: any) => console.log(err)
    );
  }

  editEmployee(employee: IEmployee ){
    this.employeeForm.patchValue({
      fullName: employee.fullName,
      contactPreference: employee.contactPreference,
      emailGroup: {
        email: employee.email,
        confirmEmail: employee.email
      },
      phone: employee.phone
    });

    this.employeeForm.setControl('skills', this.setExistingSkills(employee.skills));
  }

  setExistingSkills(skillSets: ISkill[]): FormArray {
    const formArray = new FormArray([]);
    skillSets.forEach(s => {
      formArray.push(this.fb.group({
        skillName: s.skillName,
        experienceInYears: s.experienceInYears,
        proficiency: s.proficiency
      }));
    });  
    return formArray;
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required]//default value first element
    });
  }
  addSkillButtonClick(): void {
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }

  removeSkillButtonClick(skillGroupIndex: number):void{
    const skillsFormArray = <FormArray>this.employeeForm.get('skills');
    skillsFormArray.removeAt(skillGroupIndex);
    skillsFormArray.markAsDirty();
    skillsFormArray.markAsTouched();

  }
  // If the Selected Radio Button value is "phone", then add the
  // required validator function otherwise remove it
  onContactPrefernceChange(selectedValue: string) {
    const phoneFormControl = this.employeeForm.get('phone');
    if (selectedValue === 'phone') {
      phoneFormControl.setValidators(Validators.required);
    } else {
      phoneFormControl.clearValidators();
    }
    phoneFormControl.updateValueAndValidity();
  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstarctControl = group.get(key);
      this.formErrors[key] = '';
      if (abstarctControl && !abstarctControl.valid && (abstarctControl.touched || abstarctControl.dirty || abstarctControl.value !== '')) {
        const messages = this.validationMessages[key];
        console.log(messages);
        for (const errorKey in abstarctControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
      if (abstarctControl instanceof FormGroup) {
        this.logValidationErrors(abstarctControl);
      }
      /*
      if (abstarctControl instanceof FormArray) {
        for(const control of abstarctControl.controls){
          if( control instanceof FormGroup){
            this.logValidationErrors(control);
          }
        }        
      }*/
    });
  }
  onSubmit(): void {
      this.mapFormValuesToEmployeeModel();
      if (this.employee.id) {
        this.employeeService.updateEmployee(this.employee).subscribe(
          () => this.router.navigate(['employees']),
          (err: any) => console.log(err)
        );
      } else {
        this.employeeService.addEmployee(this.employee).subscribe(
          () => this.router.navigate(['employees']),
          (err: any) => console.log(err)
        );
      }

  }

mapFormValuesToEmployeeModel() {
  this.employee.fullName = this.employeeForm.value.fullName;
  this.employee.contactPreference = this.employeeForm.value.contactPreference;
  this.employee.email = this.employeeForm.value.emailGroup.email;
  this.employee.phone = this.employeeForm.value.phone;
  this.employee.skills = this.employeeForm.value.skills;
}


  onLoadDataClick(): void {
    const formArray = this.fb.array([
      new FormControl('John', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('Male', Validators.required),
    ]);

    const formGroup = this.fb.group([
      new FormControl('John', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('Male', Validators.required),
    ]);
    console.log(formArray);
    console.log(formGroup);
  }
}

function matchEmail(group: AbstractControl): { [key: string]: any } | null {
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');
  if (emailControl.value === confirmEmailControl.value || (confirmEmailControl.pristine && confirmEmailControl.value === '')){
    return null;
  } else {
    return { 'emailMismatch': true };
  }
}

