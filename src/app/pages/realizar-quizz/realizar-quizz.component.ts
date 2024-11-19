import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-realizar-quizz',
  standalone: true,
  imports: [],
  templateUrl: './realizar-quizz.component.html',
  styleUrl: './realizar-quizz.component.css'
})
export class RealizarQuizzComponent {

  constructor(
    private router: Router,
  ) {

  }

  isCorrect() {
    Swal.fire({
      title: "Resposta correta!",
      icon: 'success',
      width: 600,
      padding: "3em",
      color: "#716add",
      background: "#fff",
      backdrop: `
          rgba(0,0,123,0.4)
          url(/gifs/nyan-cat-poptart-cat.gif)
          left top
          no-repeat
        `
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
        this.router.navigate(['/'])
      }
    })
  }
}
