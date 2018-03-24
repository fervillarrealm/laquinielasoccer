import { Routes, RouterModule } from '@angular/router';

import { LigaComponent } from './liga/liga.component';
import { LigaListComponent } from './liga/liga-list/liga-list.component';
import { LigaDetailComponent } from './liga/liga-detail/liga-detail.component';
import { LigaCreateComponent } from './liga/liga-create/liga-create.component';
import { LigaEditComponent } from './liga/liga-edit/liga-edit.component';

import { PosicionesComponent } from './posiciones/posiciones.component';
import { JornadaComponent } from './jornada/jornada.component';
import { PronosticoComponent } from './pronostico/pronostico.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';

const authRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { title: 'Iniciar Sesión' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Registrarse' } },
];

const homeRoutes: Routes = [
  { path: '', redirectTo: 'posiciones', pathMatch: 'full' },
  { path: 'posiciones', component: PosicionesComponent, data: { title: 'Posiciones' } },
  { path: 'jornadas', component: JornadaComponent, data: { title: 'jornadas' } },
  { path: 'pronostico', component: PronosticoComponent, data: { title: 'pronostico' } }
];

const appRoutes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent, data: { title: 'Auth' }, children: authRoutes },
  { path: 'home', component: HomeComponent, data: { title: 'home' }, children: homeRoutes },

  { path: 'liga', component: LigaComponent, data: { title: 'Ligas' } },

  { path: 'liga-list', component: LigaListComponent, data: { title: 'Ligas' } },
  { path: 'liga-details/:id', component: LigaDetailComponent, data: { title: 'Detalle de Liga' } },
  { path: 'liga-create', component: LigaCreateComponent, data: { title: 'Crear Liga' } },
  { path: 'liga-edit/:id', component: LigaEditComponent, data: { title: 'Editar Liga' } },
];

// export const routing = RouterModule.forRoot(appRoutes, { enableTracing: true });
export const routes = appRoutes;

