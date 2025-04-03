import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { PricingComponent } from './pricing/pricing.component';
import { AboutComponent } from './about/about.component';
import { OrdersComponent } from './orders/orders.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'homepage', component: MainpageComponent },
    { path: 'pricing', component: PricingComponent },
    { path: 'about', component: AboutComponent },
    { path: 'orders', component: OrdersComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/homepage', pathMatch: 'full' }, // Redirect to login by default
    { path: '**', redirectTo: '/homepage' } // Catch-all route
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
