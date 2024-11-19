import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IQuiz } from '../../../interfaces/IQuiz';
import { ITagIcon, tagsIcons } from '../../../constants/tagsIcon';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.css'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class QuizCardComponent implements OnInit {
  @Input() quiz!: IQuiz
  @Input() button: string = ''


  constructor(
    private router: Router,
  ) {

  }

  tagIcon: ITagIcon = {} as ITagIcon

  ngOnInit() {
    this.tagIcon = tagsIcons[this.quiz.tagId] || tagsIcons[1]
  }


  navigate( ){
    this.router.navigate(['/quiz'])
  }
}
