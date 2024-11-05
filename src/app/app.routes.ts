import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListaQuizzesComponent } from './components/lista-quizzes/lista-quizzes.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: ListaQuizzesComponent, canActivate: [authGuard],}
];
