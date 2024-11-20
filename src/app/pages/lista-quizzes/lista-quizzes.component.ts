import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  Component,
  HostListener,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { QuizCardComponent } from '../../shared/quiz-card/quiz-card.component';
import { IQuiz } from '../../../interfaces/IQuiz';
import { QuizService } from '../../../services/quiz.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserService } from '../../../services/user.service';
import { IUser } from '../../../interfaces/IUser';
import { CommonModule, DOCUMENT } from '@angular/common';
import Swal from 'sweetalert2';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { AtualizarDadosComponent } from './components/atualizar-dados/atualizar-dados.component';

@Component({
  selector: 'app-lista-quizzes',
  standalone: true,
  imports: [
    QuizCardComponent,
    CommonModule,
    AtualizarDadosComponent, // Adicionado na lista de imports
    TagListComponent,
  ],
  templateUrl: './lista-quizzes.component.html',
  styleUrls: ['./lista-quizzes.component.css'],
})
export class ListaQuizzesComponent implements OnInit {
  quizzes: IQuiz[] = [];
  myQuizzes: IQuiz[] = [];
  editarPerfil = false;
  userIconUrl: SafeUrl | null = null;
  selectedFile: File | null = null;
  userInfo: IUser = {};
  loadingIcon = false;
  loadingQuizzes = false;
  loadingMyQuizzes = false;

  public navbarVisivel: boolean = false;
  public telaGrande: boolean = false;

  constructor(
    private quizService: QuizService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private route: Router
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.telaGrande = window.innerWidth >= 992;
    if (this.telaGrande) {
      this.renderer.removeClass(this.document.body, 'no-scroll');
    }
  }

  onSubmitEvent(event: any) {
    if (event) {
      this.getUserInfo();
    }
    this.ativarEdicao();
  }

  onChangeTag(tagId: number) {
    this.getQuizzes(tagId);
    this.getMyQuizzes(tagId);
  }

  toggleNavbar() {
    if (this.navbarVisivel) {
      this.renderer.removeClass(this.document.body, 'no-scroll');
      this.editarPerfil = false;
    } else {
      this.renderer.addClass(this.document.body, 'no-scroll');
    }
    this.navbarVisivel = !this.navbarVisivel;
  }

  ngOnInit(): void {
    this.telaGrande = window.innerWidth >= 992;
    this.getUserInfo();
    this.getQuizzes();
    this.getMyQuizzes();
  }

  getQuizzes(tagId?: number) {
    this.loadingQuizzes = true;
    this.quizService.getQuizzes({ tagId }).subscribe({
      next: (res: IQuiz[]) => {
        this.loadingQuizzes = false;
        this.quizzes = res;
      },
      error: (res) => {
        this.loadingQuizzes = false;
      },
    });
  }

  getMyQuizzes(tagId?: number) {
    this.loadingMyQuizzes = true;
    this.quizService.getQuizzes({ tagId, inProgres: 'inProgres' }).subscribe({
      next: (res: IQuiz[]) => {
        this.loadingMyQuizzes = false;
        this.myQuizzes = res;
      },
      error: (res) => {
        this.loadingMyQuizzes = false;
      },
    });
  }

  getUserInfo() {
    this.userService.getUserInfos().subscribe({
      next: (res: IUser) => {
        this.userInfo = res;
        this.getIconByUserId(res.id!);
      },
      error: (err) => {
        this.toastr.error('Não foi possível obter informações do usuário');
      },
    });
  }

  ativarEdicao() {
    this.editarPerfil = !this.editarPerfil;
  }

  getIconByUserId(id: number) {
    this.loadingIcon = true;
    this.userService.getIcon(id).subscribe({
      next: (blob) => {
        this.loadingIcon = false;
        this.loadingIcon = false;
        if (!blob.size) return;
        const url = URL.createObjectURL(blob);
        this.userIconUrl = this.sanitizer.bypassSecurityTrustUrl(url);
      },
      error: (err) => {
        this.loadingIcon = false;
        console.error('Erro ao carregar a imagem', err);
      },
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.loadingIcon = true;
      const formData = new FormData();
      formData.append('file', file);
      this.userService.uploadIcon(formData).subscribe({
        next: (response) => {
          this.loadingIcon = false;
          if (!this.userInfo.id) return;
          this.getIconByUserId(this.userInfo.id);
        },
        error: (error) => {
          this.loadingIcon = false;
          console.error('Erro ao enviar o ícone', error);
        },
      });
    }
  }

  logout() {
    Swal.fire({
      title: 'Você deseja realizar o Logout?',
      text: 'Ao sair, será necessário fazer login novamente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, sair',
      cancelButtonText: 'Cancelar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        this.route.navigate(['/login']);
      }
    });
  }
}
