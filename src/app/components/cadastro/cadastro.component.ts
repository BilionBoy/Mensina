import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from '../../../services/cadastro.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cadastroService: CadastroService,
    private router: Router,
    private toast: ToastrService
  ){

    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })

  }
  ngOnInit(): void {
  }

  submitSignup() {
    if(this.signupForm.invalid) {
      let error = ""
      if(this.signupForm.get('password')?.errors) {
        error += "Senha "
      }
      if(this.signupForm.get('username')?.errors) {
        error += "Username "
      }
      if(this.signupForm.get('name')?.errors) {
        error += "Nome"
      }
      this.toast.info(error, "Campos invalidos: ")

      return

    }

    this.cadastroService.signup(this.signupForm.value)
    .subscribe({
      next: (res: any) => {
        console.log(res);

        this.toast.success("Conta criada com sucesso!")
        this.router.navigate(['/login'])
      },
      error: err => {
        this.toast.error("Já existe um usuário com esse username")

      }
    })
  }


  navigate(){
    this.router.navigate(['/login'])
  }
}
