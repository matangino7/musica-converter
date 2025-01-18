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

@NgModule({
  declarations: [
    AppComponent,
    SpotifyButtonComponent,
    AppleButtonComponent,
    AppleButtonTopComponent,
    SpotifyButtonTopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
