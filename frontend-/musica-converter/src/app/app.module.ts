import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPayPalModule } from 'ngx-paypal';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from 'src/enviroments/enviroment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

// Components
import { SpotifyButtonComponent } from './spotify-button/spotify-button.component';
import { AppleButtonComponent } from './apple-button/apple-button.component';
import { AppleButtonTopComponent } from './apple-button-top/apple-button.component';
import { SpotifyButtonTopComponent } from './spotify-button-top/spotify-button.component';
import { EnterUrlComponent } from './enter-url/enter-url.component';
import { SpotifyPlaylistsComponent } from './spotify-playlists/spotify-playlists.component';
import { PaypalComponent } from './paypal/paypal.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { PricingComponent } from './pricing/pricing.component';
import { AboutComponent } from './about/about.component';
import { OrdersComponent } from './orders/orders.component';

// Shared Module
import { SharedModule } from './shared/shared.module';

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
    PricingComponent,
    AboutComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxPayPalModule,
    SharedModule,
    CommonModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
