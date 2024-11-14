import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IQuiz } from '../../../interfaces/IQuiz';
import { Data } from '@angular/router';

interface IData {color: string, icon: string}

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

  colorsByTag: Record<number, IData> = {
    1: {color: '#FCD5D6', icon: 'database'},
    2: {color: '#E1ECE4', icon: 'computer'},
    3: {color: '#D3D4FE', icon: 'psychology_alt'},
    4: {color: '#FAEFB6', icon: 'stylus_note'}
  }

  data: IData = {} as IData

  ngOnInit() {

    this.data = this.colorsByTag[this.quiz.tagId]
  }

}
