import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { QuizService } from '../../../services/quiz.service';
import { IQuizState } from '../../../interfaces/IQuizState';
import { ToastrService } from 'ngx-toastr';
import { IQuestion } from '../../../interfaces/IQuestion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-realizar-quizz',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './realizar-quizz.component.html',
  styleUrl: './realizar-quizz.component.css'
})
export class RealizarQuizzComponent implements OnInit {
  quizId: number = 0

  quizState: IQuizState = {} as IQuizState

  answeredQuestions: IQuestion[] = []
  notAnsweredQuestions: IQuestion[] = []
  questions: IQuestion[] = []

  answeredQuestionsId: number[] = []

  questionId: number = 0

  colors: Record<number, string> = {
    1: '#FCD5D6',
    2: '#E1ECE4',
    3: '#D3D4FE',
    4: '#FAEFB6',
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private toast: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.quizId = parseInt(this.route.snapshot.paramMap.get('id') || '0')

    if (this.quizId === 0 || isNaN(this.quizId)) {
      this.router.navigate(['/'])
      return
    }
    this.getQuizState(this.quizId)
    this.getQuestions(this.quizId)
  }

  getQuizState(quizId: number) {
    this.quizService.getQuizById(quizId)
      .subscribe({
        next: (res) => {          
          this.answeredQuestionsId = Object.keys(res.questions).map(q => parseInt(q))
          this.quizState = res
          this.updateQuestionsList()
        },
        error: err => {
          this.toast.error("Erro ao carregar dados do quiz")
          this.router.navigate(['/'])
        }
      })
  }

  getQuestions(quizId: number) {
    this.quizService.getQuestions(quizId)
      .subscribe({
        next: (res) => {
          this.questions = res
          this.updateQuestionsList()
        },
        error: err => {
          this.toast.error("Erro ao carregar dados do quiz")
          this.router.navigate(['/'])
        }
      })
  }

  updateQuestionsList() {
    this.answeredQuestions = []
    this.notAnsweredQuestions = []
    this.questions.forEach(question => {
      if (this.answeredQuestionsId.includes(question.id)) {
        this.answeredQuestions.push(question)
      } else {
        this.notAnsweredQuestions.push(question)
      }
    })
  }

  isCorrect() {
    Swal.fire({
      title: "Resposta correta!",
      icon: 'success',
      width: 600,
      padding: "3em",
      color: "#000",
      background: "#fff",
      confirmButtonText: this.notAnsweredQuestions.length <= 1 ? 'Ir para home' : 'Próximo',
      text: this.notAnsweredQuestions.length <= 1 ? 'Quiz finalizado' : '',
      backdrop: `
          rgba(0,123,0,0.2)
          url(/gifs/nyan-cat-poptart-cat.gif)
          left top
          no-repeat
        `
    }).then(() => {
      if(this.notAnsweredQuestions.length <= 1) {
        this.router.navigate(['/'])
        return
      }
      this.questionId++
      this.getQuizState(this.quizId)
    });
  }

  isIncorrect() {
    Swal.fire({
      title: "Resposta incorreta!",
      icon: 'error',
      width: 600,
      padding: "3em",
      color: "#000",
      background: "#fff",
      confirmButtonText: this.notAnsweredQuestions.length <= 1 ? 'Ir para home' : 'Próximo',
      text: this.notAnsweredQuestions.length <= 1 ? 'Quiz finalizado' : '',
      backdrop: `
          rgba(0,0,123,0.3)
          url(/gifs/stitch-sad-sad-stitch-unscreen.gif)
          left top
          no-repeat
        `,

    }).then(() => {
      if(this.notAnsweredQuestions.length <= 1) {
        this.router.navigate(['/'])
        return
      }
      this.questionId++
      this.getQuizState(this.quizId)
    });
  }

  checkAnswer(answerId: number) {
    const questionId = this.notAnsweredQuestions[0].id
    this.quizService.checkAnswer(questionId, answerId)
      .subscribe({
        next: (res) => {
          if (res.is_correct) {
            this.isCorrect()
          } else {
            this.isIncorrect()
          }
        },
        error: err => {
          this.toast.error('Erro ao verificar questão')
        }
      })
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
        this.router.navigate(['/'])
      }
    })
  }
}
