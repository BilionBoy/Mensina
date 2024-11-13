import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ListaQuizzesComponent } from './pages/lista-quizzes/lista-quizzes.component';
import { authGuard } from './auth/auth.guard';
import { CadastroComponent } from './pages/cadastro/cadastro.component';

export const routes: Routes = [
  {path: '', component: ListaQuizzesComponent, canActivate: [authGuard],},
  {path: 'cadastro', component: CadastroComponent, canActivate: [authGuard],},
  {path: 'login', component: LoginComponent, canActivate: [authGuard],},
];
