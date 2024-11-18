import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IQuiz } from '../../../interfaces/IQuiz';
import { Data } from '@angular/router';
import { ITagIcon, tagsIcons } from '../../../constants/tagsIcon';

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


  constructor() {

  }

  tagIcon: ITagIcon = {} as ITagIcon

  ngOnInit() {
    this.tagIcon = tagsIcons[this.quiz.tagId] || tagsIcons[1]
  }

}
