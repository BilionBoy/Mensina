import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from '../../../services/cadastro.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';
import { WelcomeComponent } from '../../shared/welcome/welcome.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    WelcomeComponent
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {
  signupForm: FormGroup;
  loading: boolean = false

  showPassword: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private cadastroService: CadastroService,
    private router: Router,
    private toast: ToastrService
  ) {

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }
  ngOnInit(): void {
  }

  submitSignup() {
    if (this.signupForm.invalid) {
      let error = ""
      if (this.signupForm.get('password')?.errors) {
        error += "Senha deve conter pelo menos 6 caracteres "
      }
      if (this.signupForm.get('username')?.errors) {
        error += "Username deve conter pelo menos 3 caracteres"
      }
      if (this.signupForm.get('name')?.errors) {
        error += "Nome deve conter pelo menos 2 caracteres"
      }
      this.toast.info(error, "Campos invalidos: ")

      return

    }
    this.loading = true
    this.cadastroService.signup(this.signupForm.value)
      .subscribe({
        next: (res: any) => {
          this.toast.success("Conta criada com sucesso!")
          this.loading = false
          this.router.navigate(['/login'])
        },
        error: err => {
          this.loading = false
          if (!(err instanceof HttpErrorResponse)) {
            this.toast.error("Erro ao cadastrar usuario, tente novamente mais tarde.")
            return
          }
          switch (err.status) {
            case 409:
              this.toast.error("Esse nome de usuario ja esta em uso.")
              break
            default:
              this.toast.error("Erro ao cadastrar usuario, tente novamente mais tarde.")
          }
        }
      })
  }

  navigate() {
    this.router.navigate(['/login'])
  }
}
