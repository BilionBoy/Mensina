import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

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
  @Input() tag: string = ''
  @Input() title: string = ''
  @Input() button: string = ''
  bgColor: string = 'bgColor'
  constructor() { }

  ngOnInit() {
    this.bgColor = this.button === 'CONTINUAR' ? '#D3D4FE' : '#FCD5D6'
  }

}
