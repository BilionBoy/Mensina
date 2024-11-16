import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common'; 

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

  constructor(private fb: FormBuilder, private toastr: ToastrService) { 
    // Inicializa o FormGroup com os validadores
    this.atualizarDadosForm = this.fb.group({
      name: ['', [Validators.required]], // Nome obrigatório
      username: ['', [Validators.required, Validators.minLength(3)]], // Username com mínimo de 3 caracteres
      password: ['', [Validators.required, Validators.minLength(6)]] // Senha com mínimo de 6 caracteres
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.atualizarDadosForm.valid) {
      this.toastr.success('Dados atualizados com sucesso!', 'Sucesso');
      console.log('Dados atualizados:', this.atualizarDadosForm.value);
    } else {
      this.toastr.error('O formulário contém erros. Por favor, corrija-os.', 'Erro');
      console.log('O formulário é inválido.');
    }
  }
}