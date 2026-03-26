import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NotificationPreferencesComponent } from './notification-preferences';

// Reactive Forms proporciona um controle maior sobre o formulário através do componente,
// permitindo validações mais robustas e manipulação dinâmica de campos de forma programática.
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NotificationPreferencesComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  // FormGroup para gerenciar o formulário de cadastro de colaboradores
  formColaborador!: FormGroup;
  enviado = false;

  // FormBuilder é uma classe de utilidade que facilita a construção
  // de estruturas complexas como FormGroups, FormControls e FormArrays.
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.inicializarFormulario();
    this.adicionarCompetencia();
  }

  // Método para inicializar o formulário com todos os controles e validações necessárias
  inicializarFormulario() {
    this.formColaborador = this.fb.group({
      nomeCompleto: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern(/\(\d{2}\) \d{5}-\d{4}/)]],
      departamento: ['', Validators.required],
      dataAdmissao: ['', Validators.required],
      salario: ['', [Validators.required, Validators.min(0)]],
      nivelEducacao: ['', Validators.required],
      competencias: this.fb.array([])
    });
  }

  // Getter para acessar o FormArray de competências de forma mais simples
  get competencias() {
    return this.formColaborador.get('competencias') as FormArray;
  }

  // Método para adicionar uma nova competência ao FormArray
  adicionarCompetencia() {
    this.competencias.push(this.fb.control('', Validators.required));
  }

  // Método para remover uma competência do FormArray com uma trava de segurança
  removerCompetencia(index: number) {
    if (this.competencias.length > 1) {
      this.competencias.removeAt(index);
    }
  }

  // Método chamado ao submeter o formulário
  onSubmit() {
    if (this.formColaborador.valid) {
      console.log('Dados do Colaborador (Reactive):', this.formColaborador.value);
      this.enviado = true;

      // Reset do formulário e limpeza do FormArray
      this.formColaborador.reset();
      this.competencias.clear();
      this.adicionarCompetencia();

      // Remover mensagem de sucesso após 5 segundos
      setTimeout(() => this.enviado = false, 5000);
    }
  }
}
