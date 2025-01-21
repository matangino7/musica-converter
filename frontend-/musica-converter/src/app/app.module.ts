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

@NgModule({
  declarations: [
    AppComponent,
    SpotifyButtonComponent,
    AppleButtonComponent,
    AppleButtonTopComponent,
    SpotifyButtonTopComponent,
    EnterUrlComponent,
    SpotifyPlaylistsComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
