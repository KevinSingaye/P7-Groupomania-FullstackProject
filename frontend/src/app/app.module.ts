import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './components/publication/edit/edit.component';
import { HeaderComponent } from './components/header/header.component';
import { DisplayComponent } from './components/publication/display/display.component';
import { EditComponent as EditComponentCommentaire } from './components/commentaire/edit/edit.component';
import { DisplayComponent as DisplayComponentCommentaire } from './components/commentaire/display/display.component';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    EditComponent,
    HeaderComponent,
    DisplayComponent,
    EditComponentCommentaire,
    DisplayComponentCommentaire
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
