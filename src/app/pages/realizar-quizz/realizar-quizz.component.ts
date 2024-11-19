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
      color: "#000",
      background: "#fff",
      confirmButtonText:'Próximo',
      backdrop: `
          rgba(0,123,0,0.2)
          url(/gifs/nyan-cat-poptart-cat.gif)
          left top
          no-repeat
        `
    });
  }

  isIncorrect(){
    Swal.fire({
      title: "Resposta incorreta!",
      icon: 'error',
      width: 600,
      padding: "3em",
      color: "#000",
      background: "#fff",
      confirmButtonText:'Próximo',
      backdrop: `
          rgba(0,0,123,0.3)
          url(/gifs/stitch-sad-sad-stitch-unscreen.gif)
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
