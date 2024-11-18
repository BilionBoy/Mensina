import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../../services/user.service';
import { IUser } from '../../../../../interfaces/IUser';

@Component({
  selector: 'app-atualizar-dados',
  standalone: true,
  imports: [
    ReactiveFormsModule, // Formulários reativos
    ToastrModule, // Módulo para Toastr
    CommonModule // Importando CommonModule para usar *ngIf e outras diretivas
  ],
  templateUrl: './atualizar-dados.component.html',
  styleUrls: ['./atualizar-dados.component.css']
})
export class AtualizarDadosComponent implements OnInit {
  atualizarDadosForm: FormGroup;
  @Input() userInfo: IUser = {}
  @Output() onSubmitEvent = new EventEmitter()

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService
  ) {
    // Inicializa o FormGroup com os validadores
    this.atualizarDadosForm = this.fb.group({
      name: ['', [Validators.required]], // Nome obrigatório
      username: ['', [Validators.required, Validators.minLength(3)]], // Username com mínimo de 3 caracteres
      password: [''] // Senha com mínimo de 6 caracteres
    });
  }

  ngOnInit(): void {
    this.atualizarDadosForm.get('name')?.setValue(this.userInfo.name)
    this.atualizarDadosForm.get('username')?.setValue(this.userInfo.username)
  }

  onSubmit() {
    if (this.atualizarDadosForm.invalid) {
      this.toastr.error('O formulário contém erros. Por favor, corrija-os.', 'Erro');
      return
    }
    // Supondo que você obtenha o token de algum lugar (ex: localStorage ou um serviço de autenticação)
    if (this.atualizarDadosForm.get('password')?.value && this.atualizarDadosForm.get('password')?.value.length < 6) {
      this.toastr.error('A senha deve conter no mínimo 6 caracteres.', 'Erro');
      return
    }

    this.userService.atualizarDadosUsuario(this.atualizarDadosForm.value)
      .subscribe({
        next: () => {
          this.toastr.success('Dados atualizados com sucesso!', 'Sucesso');
          this.onSubmitEvent.emit(true)
        },
        error: (err: any) => {
          this.toastr.error('Erro ao atualizar os dados. Por favor, tente novamente.', 'Erro');
          console.error('Erro ao atualizar:', err);
        }
      });
  }

}