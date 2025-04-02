import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpotifyButtonComponent } from './spotify-button/spotify-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { AppleButtonComponent } from './apple-button/apple-button.component';
import { AppleButtonTopComponent } from './apple-button-top/apple-button.component';
import { SpotifyButtonTopComponent } from './spotify-button-top/spotify-button.component';
import { EnterUrlComponent } from './enter-url/enter-url.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { SpotifyPlaylistsComponent } from './spotify-playlists/spotify-playlists.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { NgxPayPalModule } from 'ngx-paypal';
import { PaypalComponent } from './paypal/paypal.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from 'src/enviroments/enviroment';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { MainpageComponent } from './mainpage/mainpage.component';

@NgModule({
  declarations: [
    AppComponent,
    SpotifyButtonComponent,
    AppleButtonComponent,
    AppleButtonTopComponent,
    SpotifyButtonTopComponent,
    EnterUrlComponent,
    SpotifyPlaylistsComponent,
    PaypalComponent,
    LoginComponent,
    RegisterComponent,
    MainpageComponent,
],
imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatStepperModule,
    MatCheckboxModule,
    MatRadioModule,
    NgxPayPalModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
