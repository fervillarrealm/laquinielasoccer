import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { routes } from './app.routes';

import { AppComponent } from './app.component';

import { LigaComponent } from './liga/liga.component';
import { LigaDetailComponent } from './liga/liga-detail/liga-detail.component';
import { LigaCreateComponent } from './liga/liga-create/liga-create.component';
import { LigaEditComponent } from './liga/liga-edit/liga-edit.component';

import { PosicionesComponent } from './posiciones/posiciones.component';
import { JornadaComponent } from './jornada/jornada.component';
import { LoginComponent } from './auth/login/login.component';

import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { LigaListComponent } from './liga/liga-list/liga-list.component';
import { HomeComponent } from './home/home.component';
import { PronosticoComponent } from './pronostico/pronostico.component';
import { PartidoFormComponent } from './partido-form/partido-form.component';

@NgModule({
  declarations: [
    AppComponent,

    LigaComponent,
    LigaDetailComponent,
    LigaCreateComponent,
    LigaEditComponent,
    PosicionesComponent,
    JornadaComponent,
    LoginComponent,
    AuthComponent,
    RegisterComponent,
    LigaListComponent,
    HomeComponent,
    PronosticoComponent,
    PartidoFormComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
