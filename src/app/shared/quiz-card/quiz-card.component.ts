import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IQuiz } from '../../../interfaces/IQuiz';
import { ITagIcon, tagsIcons } from '../../../constants/tagsIcon';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

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


  navigate() {
    let timerInterval: any;
    Swal.fire({
      title: "Seu quiz vai começar em:",
      html: `<b style="font-size: 40px;"></b>`,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'rgb(180,0,0, 0.8)',
      didOpen: () => {
        const timer = Swal.getPopup()?.querySelector("b");
        let time: number = 3
        timer!.textContent = `${time}`;
        timerInterval = setInterval(() => {
          time -= 1
          timer!.textContent = `${time}`;

        }, 1000);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      
      if (result.dismiss !== Swal.DismissReason.timer) return

      this.router.navigate(['/quiz', this.quiz.id])
    });
  }
}
