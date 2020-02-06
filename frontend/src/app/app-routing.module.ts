import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './_helpers/auth-guard';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
  { path: 'dash', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},

  // redirections
  { path: '', redirectTo: 'dash', pathMatch: 'full'},
  { path: '**', redirectTo: 'dash'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
