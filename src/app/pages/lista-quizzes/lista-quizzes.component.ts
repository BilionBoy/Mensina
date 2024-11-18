import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, HostListener, Inject, OnInit, Renderer2 } from '@angular/core';
import { QuizCardComponent } from '../../shared/quiz-card/quiz-card.component';
import { IQuiz } from '../../../interfaces/IQuiz';
import { QuizService } from '../../../services/quiz.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserService } from '../../../services/user.service';
import { IUser } from '../../../interfaces/IUser';
import { CommonModule, DOCUMENT } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-quizzes',
  standalone: true,
  imports: [
    QuizCardComponent,
    CommonModule
  ],
  templateUrl: './lista-quizzes.component.html',
  styleUrl: './lista-quizzes.component.css'
})
export class ListaQuizzesComponent implements OnInit {
  quizzes: IQuiz[] = []
  editarPerfil = false;
  userIconUrl: SafeUrl | null = null;
  selectedFile: File | null = null;
  usuario: IUser = {};
  loading = true

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
  ) { }

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
      this.editarPerfil = false
    } else {
      this.renderer.addClass(this.document.body, 'no-scroll');
    }
    this.navbarVisivel = !this.navbarVisivel;

  }

  ativarEdicao() {
    this.editarPerfil = !this.editarPerfil
  }

  ngOnInit(): void {
    this.telaGrande = window.innerWidth >= 992;
    this.quizService.getQuizzes()
      .subscribe({
        next: (res: IQuiz[]) => {
          this.loading = false
          this.quizzes = res
        },
        error: (res) => {
          this.loading = false
        }
      })


    this.userService.getUserInfos().subscribe({
      next: (res: IUser) => {
        this.usuario = res;
        this.getIconByUserId(res.id!)
      },
      error: (err) => {
        this.toastr.error('Não foi possível obter informação do usuário')
      }
    })
  }

  getIconByUserId(id: number) {
    this.userService.getIcon(id).subscribe({
      next: (blob) => {
        console.log(blob);
        if (!blob.size) return

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
          if (!this.usuario.id) return
          this.getIconByUserId(this.usuario.id)
        },
        error: (error) => console.error('Erro ao enviar o ícone', error)
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
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token')
        this.route.navigate(['/login'])
      }
    })
  }

}
