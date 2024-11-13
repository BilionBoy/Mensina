import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WelcomeComponent } from '../../shared/welcome/welcome.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule  ,
    WelcomeComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  submitLogin(){
    this.loginService.login(this.loginForm.value)
    .subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token)
        this.router.navigate([''])
      },
      error: (res) => {
        console.log(res);
        this.toastr.error("Senha ou username incorreto")
      }
    })
  }

  navigate(){
    this.router.navigate(['/cadastro'])
  }

}
