import { Component, OnInit } from '@angular/core';
import { QuizCardComponent } from '../../shared/quiz-card/quiz-card.component';
import { IQuiz } from '../../../interfaces/IQuiz';
import { QuizService } from '../../../services/quiz.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-lista-quizzes',
  standalone: true,
  imports: [
    QuizCardComponent
  ],
  templateUrl: './lista-quizzes.component.html',
  styleUrl: './lista-quizzes.component.css'
})
export class ListaQuizzesComponent implements OnInit {
  quizzes: IQuiz[] = []
  editarPerfil = false;
  userIconUrl: SafeUrl | null = null;
  selectedFile: File | null = null;
  
  constructor(
    private quizService: QuizService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
  ){}
  
  ativarEdicao(){
    this.editarPerfil = !this.editarPerfil

  }

  ngOnInit(): void {
    this.quizService.getQuizzes()
    .subscribe({
      next: (res: IQuiz[]) => {
        this.quizzes = res
      },
      error: (res) => {
      }
    })
    this.getIconByUserId(12)
  }

  getIconByUserId(id: number) {
    this.userService.getIcon(id).subscribe({
      next: (blob) => {        
        const url = URL.createObjectURL(blob);
        this.userIconUrl = this.sanitizer.bypassSecurityTrustUrl(url);
      },
      error: (err) => console.error('Erro ao carregar a imagem', err)
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmitUserIcon(event: Event): void {
    event.preventDefault();
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.userService.uploadIcon(formData).subscribe({
        next: (response) => {
          this.getIconByUserId(12)
        },
        error: (error) => console.error('Erro ao enviar o ícone', error)
      });
    } else {
      console.error('Nenhum arquivo selecionado');
    }
  }
}
