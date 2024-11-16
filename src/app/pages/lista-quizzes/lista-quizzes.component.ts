import { ToastrService } from 'ngx-toastr';
import { Component, HostListener, Inject, OnInit, Renderer2 } from '@angular/core';
import { QuizCardComponent } from '../../shared/quiz-card/quiz-card.component';
import { IQuiz } from '../../../interfaces/IQuiz';
import { QuizService } from '../../../services/quiz.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserService } from '../../../services/user.service';
import { IUser } from '../../../interfaces/IUser';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AtualizarDadosComponent } from '../atualizar-dados/atualizar-dados.component'; // Corrigido para o caminho correto

@Component({
  selector: 'app-lista-quizzes',
  standalone: true,
  imports: [
    QuizCardComponent,
    CommonModule,
    AtualizarDadosComponent // Adicionado na lista de imports
  ],
  templateUrl: './lista-quizzes.component.html',
  styleUrls: ['./lista-quizzes.component.css']
})
export class ListaQuizzesComponent implements OnInit {
  quizzes: IQuiz[] = [];
  editarPerfil = false;
  userIconUrl: SafeUrl | null = null;
  selectedFile: File | null = null;
  usuario: IUser = {};

  public navbarVisivel: boolean = false;
  public telaGrande: boolean = false;

  constructor(
    private quizService: QuizService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.telaGrande = window.innerWidth >= 992;
    if (this.telaGrande) {
      this.renderer.removeClass(this.document.body, 'no-scroll');
    }
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

  ativarEdicao() {
    this.editarPerfil = !this.editarPerfil;
  }

  ngOnInit(): void {
    this.telaGrande = window.innerWidth >= 992;
    this.quizService.getQuizzes().subscribe({
      next: (res: IQuiz[]) => {
        this.quizzes = res;
      },
      error: (res) => {
        // Tratar erro de quizzes
      }
    });

    this.userService.getUserInfos().subscribe({
      next: (res: IUser) => {
        this.usuario = res;
        this.getIconByUserId(res.id!);
      },
      error: (err) => {
        this.toastr.error('Não foi possível obter informações do usuário');
      }
    });
  }

  getIconByUserId(id: number) {
    this.userService.getIcon(id).subscribe({
      next: (blob) => {
        if (!blob.size) return;
        const url = URL.createObjectURL(blob);
        this.userIconUrl = this.sanitizer.bypassSecurityTrustUrl(url);
      },
      error: (err) => console.error('Erro ao carregar a imagem', err)
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.userService.uploadIcon(formData).subscribe({
        next: (response) => {
          if (!this.usuario.id) return;
          this.getIconByUserId(this.usuario.id);
        },
        error: (error) => console.error('Erro ao enviar o ícone', error)
      });
    }
  }
}