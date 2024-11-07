import { Component, OnInit } from '@angular/core';
import { QuizCardComponent } from '../../shared/quiz-card/quiz-card.component';
import { IQuiz } from '../../../interfaces/IQuiz';
import { QuizService } from '../../../services/quiz.service';

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

  constructor(private quizService: QuizService){}

  ngOnInit(): void {
    this.quizService.getQuizzes()
    .subscribe({
      next: (res: IQuiz[]) => {
        console.log('DADOS: ', res)
        this.quizzes = res
      },
      error: (res) => {
        console.log('n deu bom n', res);
      }
    })
  }

}
