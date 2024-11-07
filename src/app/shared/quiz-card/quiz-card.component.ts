import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.css'],
  standalone: true,
})
export class QuizCardComponent implements OnInit {
  @Input() tag: string = ''
  @Input() title: string = ''
  constructor() { }

  ngOnInit() {
  }

}
