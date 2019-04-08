import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { EventLiveComponent } from './components/event/event-live.component';
import { UserTabComponent } from './components/user/user-tab.component';
import { EventCreateComponent } from './components/user/event-create/event-create.component';
import { EventListComponent } from './components/user/event-list/event-list.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'event', children: [
      { path: ':id/live', component: EventLiveComponent }
    ]
  },
  {
    path: 'user' ,children: [
      { path: '', component: UserTabComponent },
      { path: 'create', component: EventCreateComponent },
      { path: 'list', component: EventListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
