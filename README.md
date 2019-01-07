# Angular6Project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
# Installing bootstrap and jquery
 npm install bootstrap@3 jquery --save
 Update the angular.json file to use bootstrap and jquery.
 "styles": [
  "src/styles.css",
  "node_modules/bootstrap/dist/css/bootstrap.min.css"
]

"scripts": [
  "node_modules/jquery/dist/jquery.min.js",
  "node_modules/bootstrap/dist/js/bootstrap.min.js"
]
# Setting Up routing to start with
### Creating Components
ng g c employee/create-employee --spec=false --flat=true
ng g c employee/list-employees --spec=false --flat=true
### Creating modules
ng g m app-routing --flat=true --module=app

### Creating Fake REST API

First let's create a fake online REST API. 

The following is the JSON Server Github page 
https://github.com/typicode/json-server 
Steps: 
1. npm install -g json-server 
2. Create db.json in the root project folder. Copy and paste following data.
{
    "employees": [
        {
            "id": 1,
            "fullName": "Mark",
            "contactPreference": "email",
            "email": "mark@email.com",
            "phone": "5641238971",
            "skills": [
                {
                    "skillName": "C#",
                    "experienceInYears": 1,
                    "proficiency": "beginner"
                },
                {
                    "skillName": "Java",
                    "experienceInYears": 2,
                    "proficiency": "intermediate"
                }
            ]
        },
        {
            "id": 2,
            "fullName": "John",
            "contactPreference": "phone",
            "email": "john@email.com",
            "phone": "3242138971",
            "skills": [
                {
                    "skillName": "Angular",
                    "experienceInYears": 2,
                    "proficiency": "beginner"
                },
                {
                    "skillName": "HTML",
                    "experienceInYears": 2,
                    "proficiency": "intermediate"
                },
                {
                    "skillName": "LINQ",
                    "experienceInYears": 3,
                    "proficiency": "advanced"
                }
            ]
        }
    ]
}
3. json-server --watch db.json
4. http://localhost:3000/employees
