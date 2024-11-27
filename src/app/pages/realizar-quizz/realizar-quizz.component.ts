import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';
import { QuizService } from '../../../services/quiz.service';
import { IQuizState } from '../../../interfaces/IQuizState';
import { ToastrService } from 'ngx-toastr';
import { IQuestion } from '../../../interfaces/IQuestion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-realizar-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './realizar-quizz.component.html',
  styleUrl: './realizar-quizz.component.css',
})
export class RealizarQuizzComponent implements OnInit {
  quizId: number = 0;
  quizIsFinished: boolean = false;
  quizState: IQuizState = {} as IQuizState;

  answeredQuestions: IQuestion[] = [];
  notAnsweredQuestions: IQuestion[] = [];
  questions: IQuestion[] = [];

  answeredQuestionsId: number[] = [];

  colors: Record<number, string> = {
    1: '#FCD5D6',
    2: '#E1ECE4',
    3: '#D3D4FE',
    4: '#FAEFB6',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.quizId = parseInt(this.route.snapshot.paramMap.get('id') || '0');

    if (this.quizId === 0 || isNaN(this.quizId)) {
      this.router.navigate(['/']);
      return;
    }
    this.getQuizState();
    this.getQuestions();
  }

  getQuizState() {
    this.quizService.getQuizById(this.quizId).subscribe({
      next: (res) => {
        this.answeredQuestionsId = Object.keys(res.questions).map((q) =>
          parseInt(q)
        );
        this.quizState = res;
        this.updateQuestionsList();
      },
      error: (err) => {
        this.toast.error('Erro ao carregar dados do quiz');
        this.router.navigate(['/']);
      },
    });
  }

  getQuestions() {
    this.quizService.getQuestions(this.quizId).subscribe({
      next: (res) => {
        this.questions = res;
        this.updateQuestionsList();
      },
      error: (err) => {
        this.toast.error('Erro ao carregar dados do quiz');
        this.router.navigate(['/']);
      },
    });
  }

  updateQuestionsList() {
    this.answeredQuestions = [];
    this.notAnsweredQuestions = [];
    this.questions.forEach((question) => {
      if (this.answeredQuestionsId.includes(question.id)) {
        this.answeredQuestions.push(question);
      } else {
        this.notAnsweredQuestions.push(question);
      }
    });
  }

  getAlertOptions(status: 'success' | 'error'): SweetAlertOptions {
    const title =
      status === 'success' ? 'Resposta correta!' : 'Resposta incorreta!';
    const confirmButtonText = this.quizIsFinished ? 'Ir para home' : 'Próximo';

    const html = this.quizIsFinished
      ? `
    <div>
    <p>Média de acertos: ${(
      (this.quizState.correct / this.quizState.total) *
      100
    ).toFixed(0)} %</p>
    <p>Total de acertos: ${this.quizState.correct}</p>
    <p>Pontuação: ${this.quizState.score} XP</p>
    </div>
    `
      : undefined;

    const backdrop =
      (status === 'success'
        ? `
      rgba(0,123,0,0.2)
      url(/gifs/nyan-cat-poptart-cat.gif)`
        : `
        rgba(0,0,123,0.3)
        url(/gifs/stitch-sad-sad-stitch-unscreen.gif)`) +
      `
    left top
    no-repeat
  `;
    return {
      title,
      icon: status,
      width: 600,
      padding: '3em',
      color: '#000',
      background: '#fff',
      confirmButtonText,
      html,
      backdrop,
    };
  }

  alertCallback() {
    if (this.quizIsFinished) {
      this.router.navigate(['/']);
      return;
    }
    this.getQuizState();
  }

  checkAnswer(answerId: number) {
    const questionId = this.notAnsweredQuestions[0].id;
    this.quizService.checkAnswer(questionId, answerId).subscribe({
      next: async (res) => {
        if (this.notAnsweredQuestions.length <= 1) {
          this.quizIsFinished = true;
          this.quizState = await this.finishQuiz();
        }
        if (res.is_correct) {
          Swal.fire(this.getAlertOptions('success')).then(() =>
            this.alertCallback()
          );
        } else {
          Swal.fire(this.getAlertOptions('error')).then(() =>
            this.alertCallback()
          );
        }
      },
      error: (err) => {
        this.toast.error('Erro ao verificar questão');
      },
    });
  }

  finishQuiz() {
    return new Promise<IQuizState>((resolve) => {
      this.quizService.finishQuiz(this.quizId).subscribe({
        next: (res) => resolve(res),
      });
    });
  }

  close() {
    Swal.fire({
      title: 'Você deseja sair do quiz?',
      text: 'Ao sair, suas informações serão salvas.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, sair',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/']);
      }
    });
  }
}
