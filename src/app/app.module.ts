import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {MaterialModule} from '@angular/material';

import {CoreModule} from "./core/core.module";
import {WelcomeModule} from "./welcome/welcome.module";

import {AppComponent} from './app.component';

import {AppRoutingModule} from "./app-routing.module";
import {AuthModule} from "./auth/auth.module";

import {MdInputContainer} from '@angular/material/input';
import {MdButton} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    MdInputContainer,
    MdButton
  ],
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,

    CoreModule.forRoot(),
    AuthModule.forRoot(),
    WelcomeModule.forRoot(),

    AppRoutingModule,

    MaterialModule,

    MdInputContainer
  ],
  providers:    [],
  bootstrap:    [AppComponent],
})
export class AppModule {
}
