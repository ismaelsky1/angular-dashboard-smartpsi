import {NgModule} from '@angular/core';
import {ExtraOptions, Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {SingleLayoutComponent} from './single-layout/single-layout.component';
import {AuthGuard} from '../helpers/auth.guard';

const routerOptions: ExtraOptions = {
  useHash: true,
  anchorScrolling: 'enabled',
  enableTracing: false
};

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'enchiridion',
        loadChildren: () => import('./pages/attendance/enchiridion/enchiridion.module').then(m => m.EnchiridionModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'enchiridion/:id',
        loadChildren: () => import('./pages/attendance/enchiridion-detail/enchiridion-detail.module').then(m => m.EnchiridionDetailModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'appointment',
        loadChildren: () => import('./pages/attendance/appointment/appointment.module').then(m => m.AppointmentModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'peoples',
        loadChildren: () => import('./pages/registre/peoples/peoples.module').then(m => m.PeoplesModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/maintenance/profile/profile.module').then(m => m.ProfileModule),
        canActivate: [AuthGuard]
      }
      ,
      {
        path: 'finance',
        loadChildren: () => import('./pages/maintenance/finance/finance.module').then(m => m.FinanceModule),
        canActivate: [AuthGuard]
      }


      ,
      {
        path: 'users',
        loadChildren: () => import('./pages/maintenance/users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuard]
      } ,
      {
        path: 'tutorial/welcome',
        loadChildren: () => import('./pages/tutorial/tutorial/tutorial.module').then(m => m.TutorialModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'tutorial/first-step',
        loadChildren: () => import('./pages/tutorial/first-step/first-step.module').then(m => m.FirstStepModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'tutorial/personalized-config',
        loadChildren: () => import('./pages/tutorial/personalized-config/personalized-config.module').then(m => m.PersonalizedConfigModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'tutorial/enchiridion',
        loadChildren: () => import('./pages/tutorial/enchiridion/enchiridion.module').then(m => m.EnchiridionModule),
        canActivate: [AuthGuard]
      }
      

    ]
  },
  {
    path: '',
    component: SingleLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule) },
      {
        path: 'recover-password',
        loadChildren: () => import('./pages/auth/recover-password/recover-password.module').then(m => m.RecoverPasswordModule)
      },
      {
        path: 'forgot-password',
        loadChildren: () => import('./pages/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
      },
      {
        path: 'welcome',
        loadChildren: () => import('./pages/auth/welcome/welcome.module').then(m => m.WelcomeModule)
      },
      {
        path: 'profile-welcome',
        loadChildren: () => import('./pages/auth/profile-welcome/profile-welcome.module').then(m => m.ProfileWelcomeModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'sing-up',
        loadChildren: () => import('./pages/auth/signup/signup.module').then(m => m.SignUpModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
