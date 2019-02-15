import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent, LoginComponent, RegisterComponent, AdminComponent } from './components';
import { AuthGuard, RoleGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: '',
        canActivateChild: [RoleGuard],
        children: [
          {
            path: 'admin',
            component: AdminComponent,
            data: {
              expectedRole: 'admin'
            },
          },
        ]
      }
    ],
  }
,
  {
    path: 'login',
    component: LoginComponent,
  }
,
  {
    path: 'register',
    component: RegisterComponent,
   }
,
  // otherwise redirect to home
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
