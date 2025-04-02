import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { MainpageComponent } from './mainpage/mainpage.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'homepage', component: MainpageComponent },
    { path: '', redirectTo: '/homepage', pathMatch: 'full' }, // Redirect to login by default
    { path: '**', redirectTo: '/homepage' } // Catch-all route
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
