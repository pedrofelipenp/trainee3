import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormRecord, FormControl } from '@angular/forms';

// FormRecord é uma estrutura genérica que permite criar formulários dinâmicos sem precisar
// definir classes específicas. Todos os campos compartilham o mesmo tipo (neste caso, boolean).
// É muito útil para cenários onde as chaves são dinâmicas e vêm, por exemplo, de um banco de dados.
@Component({
  selector: 'app-notification-preferences',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="preferences-container" [formGroup]="configAlertas">
      <div class="preferences-header">
        <h3>⚙️ Configurações de Alertas</h3>
        <p>Escolha como você deseja receber notificações</p>
      </div>

      <div class="preferences-list">
        @for (item of itensAlertas; track item) {
          <div class="preference-item">
            <div class="checkbox-wrapper">
              <input
                type="checkbox"
                [id]="item"
                [formControlName]="item"
              >
              <label [for]="item">{{ labelsAlertas[item] }}</label>
            </div>
            <span class="status">
              @if (configAlertas.get(item)?.value) {
                <span class="badge ativo">Ativo</span>
              } @else {
                <span class="badge inativo">Inativo</span>
              }
            </span>
          </div>
        }
      </div>

      <div class="config-display">
        <h4>Configuração Atual (FormRecord):</h4>
        <pre>{{ configAlertas.value | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .preferences-container {
      background: #f8f9fa;
      padding: 25px;
      border-radius: 10px;
      border-left: 5px solid #667eea;
    }

    .preferences-header {
      margin-bottom: 20px;
    }

    .preferences-header h3 {
      color: #333;
      margin-bottom: 5px;
    }

    .preferences-header p {
      color: #666;
      font-size: 0.9rem;
    }

    .preferences-list {
      margin-bottom: 20px;
    }

    .preference-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #e0e0e0;
      transition: background 0.2s ease;
    }

    .preference-item:hover {
      background: rgba(102, 126, 234, 0.05);
    }

    .preference-item:last-child {
      border-bottom: none;
    }

    .checkbox-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
    }

    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: #667eea;
    }

    label {
      cursor: pointer;
      color: #333;
      font-size: 0.95rem;
      margin: 0;
      font-weight: normal;
    }

    .status {
      display: flex;
      align-items: center;
    }

    .badge {
      font-size: 0.75rem;
      padding: 4px 10px;
      border-radius: 20px;
      font-weight: 600;
    }

    .badge.ativo {
      background-color: #d4edda;
      color: #155724;
    }

    .badge.inativo {
      background-color: #f8d7da;
      color: #721c24;
    }

    .config-display {
      background: white;
      padding: 15px;
      border-radius: 6px;
      margin-top: 15px;
      border: 1px solid #e0e0e0;
    }

    .config-display h4 {
      margin-bottom: 10px;
      color: #333;
      font-size: 0.9rem;
    }

    pre {
      background: #f5f5f5;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 0.8rem;
      color: #666;
      margin: 0;
    }
  `]
})
export class NotificationPreferencesComponent {
  // FormRecord garante que todos os controles sejam do tipo boolean
  configAlertas = new FormRecord<FormControl<boolean>>({
    alertasUrgentes: new FormControl(true, { nonNullable: true }),
    atualizacoesSemanais: new FormControl(false, { nonNullable: true }),
    relatoiosMensais: new FormControl(true, { nonNullable: true }),
    notificacoesRH: new FormControl(false, { nonNullable: true }),
    comunicadosEmpresa: new FormControl(true, { nonNullable: true })
  });

  // Mapeamento de chaves para labels amigáveis
  labelsAlertas: Record<string, string> = {
    alertasUrgentes: 'Receber alertas de assuntos urgentes',
    atualizacoesSemanais: 'Receber atualizações semanais por email',
    relatoiosMensais: 'Receber relatórios mensais de performance',
    notificacoesRH: 'Receber notificações de RH',
    comunicadosEmpresa: 'Receber comunicados da empresa'
  };

  // Getter para iterar as chaves de forma dinâmica
  get itensAlertas() {
    return Object.keys(this.configAlertas.controls);
  }
}
