import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { log } from 'console';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginCard = true;
  loginForm: FormGroup
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })

    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  submitLogin(){
    this.loginService.login(this.loginForm.value)
    .subscribe({
      next: (res: any) => {
        console.log(res);

        localStorage.setItem('token', res.token)
        this.router.navigate([''])
      },
      error: (res) => {
        console.log(res);
      }
    })
  }

  submitSignup() {
    this.loginService.signup(this.signupForm.value)
    .subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (res) => {
        console.log(res);
      }
    })
  }
}
