import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule  } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';
import { SidenavListComponent } from './components/shared/sidenav-list/sidenav-list.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { EventPostQuestionComponent } from './components/event/event-post-question/event-post-question.component';
import { EventLiveComponent } from './components/event/event-live.component';
import { EventQuestionComponent } from './components/event/event-question/event-question.component';
import { environment } from 'src/environments/environment';
import { UserTabComponent } from './components/user/user-tab.component';
import { EventCreateComponent } from './components/user/event-create/event-create.component';
import { EventListComponent } from './components/user/event-list/event-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidenavListComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    EventLiveComponent,
    EventQuestionComponent,
    EventPostQuestionComponent,
    UserTabComponent,
    EventCreateComponent,
    EventListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
