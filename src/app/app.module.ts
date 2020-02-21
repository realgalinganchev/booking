import { UserComponent } from './user/user.component';
import { VenuesDetailsComponent } from './venues/details/details.component';
import { CreateVenueComponent } from './venues/create/create.component';
import { VenuesListComponent } from './venues/list/list.component';
import { EventsDetailsResolver } from './events/details/details.resolver';
import { EventsModule } from './events/events.module';
import { VenuesModule } from './venues/venues.module';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CoreModule } from './core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { environment } from '../environments/environment';
import { AuthService } from './shared/services/auth.service';
import { FirebaseService } from './shared/services/firebase.service';
import { CreateEventComponent } from './events/create/create.component';
import { EventsListComponent } from './events/list/list.component';
import { EventsDetailsComponent } from './events/details/details.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { VenuesDetailsResolver } from './venues/details/venues.resolver';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    CreateEventComponent,
    EventsListComponent,
    EventsDetailsComponent,
    FavouritesComponent,
    VenuesListComponent,
    CreateVenueComponent,
    VenuesDetailsComponent,
    UserComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    CoreModule,
    VenuesModule,
    FormsModule,
    EventsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,


  ],
  providers: [AuthService, FirebaseService, EventsDetailsResolver, VenuesDetailsResolver, AngularFireAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
