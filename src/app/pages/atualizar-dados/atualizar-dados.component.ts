import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common'; 
import { UserService } from '../../../services/user.service';
import { IUser } from '../../../interfaces/IUser';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-atualizar-dados',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    ToastrModule, 
    CommonModule 
  ],
  templateUrl: './atualizar-dados.component.html',
  styleUrls: ['./atualizar-dados.component.css']
})
export class AtualizarDadosComponent implements OnInit {
  atualizarDadosForm: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private userService: UserService) { 
    // Inicializa o FormGroup com os validadores
    this.atualizarDadosForm = this.fb.group({
      name: ['', [Validators.required]], 
      username: ['', [Validators.required, Validators.minLength(3)]], 
      password: ['', [Validators.minLength(6)]] // Removeu o 'Validators.required'
    });
  }

  ngOnInit() {
    this.userService.getUserInfos().subscribe({
      next: (res: IUser) => {
        this.atualizarDadosForm.patchValue({
          name: res.name,
          username: res.username
        });
        // Não há necessidade de redefinir os validadores aqui
      },
      error: (err: HttpErrorResponse) => {
        this.toastr.error('Não foi possível carregar os dados do usuário', 'Erro');
        console.error('Detalhes do erro:', err);
      }
    });
  }

  get name() {
    return this.atualizarDadosForm.get('name');
  }

  get username() {
    return this.atualizarDadosForm.get('username');
  }

  get password() {
    return this.atualizarDadosForm.get('password');
  }

  onSubmit() {
    if (this.atualizarDadosForm.valid) {
      const token = localStorage.getItem('authToken');

      if (!token) {
        this.toastr.error('Usuário não autenticado.', 'Erro');
        return;
      }

      this.userService.atualizarDadosUsuario(this.atualizarDadosForm.value, token)
        .subscribe({
          next: () => {
            this.toastr.success('Dados atualizados com sucesso!', 'Sucesso');
          },
          error: (err: any) => {
            this.toastr.error('Erro ao atualizar os dados. Por favor, tente novamente.', 'Erro');
            console.error('Erro ao atualizar:', err);
          }
        });
    } else {
      this.toastr.error('O formulário contém erros. Por favor, corrija-os.', 'Erro');
    }
  }
}
