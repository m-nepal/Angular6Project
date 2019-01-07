import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

// Import the components so they can be referenced in routes
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';

// The last route is the empty path route. This specifies
// the route to redirect to if the client side path is empty.
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'employees', loadChildren: './employee/employee.module#EmployeeModule' },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
