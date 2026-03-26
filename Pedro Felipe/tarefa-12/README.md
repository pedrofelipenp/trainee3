# 📊 Tarefa 12: Cadastro de Colaboradores com Reactive Forms

Este projeto demonstra a implementação de **Reactive Forms** no Angular, focando em validação robusta, manipulação dinâmica de campos e estruturas avançadas de formulários como **FormArray** e **FormRecord**.

---

## 🎯 Objetivos da Tarefa

Conforme especificado na atividade, este projeto implementa:

1. ✅ **Um novo formulário com Reactive Forms**
   - Formulário de cadastro de colaboradores com controle programático
   - Validações síncronas no componente TypeScript
   - Feedback em tempo real para o usuário

2. ✅ **Pelo menos um campo multivalorado (FormArray)**
   - Campo dinâmico de "Competências Técnicas"
   - Permite adicionar e remover competências
   - Trava de segurança: sempre mantém pelo menos uma competência

3. ✅ **Um caso de uso com FormRecord**
   - Componente "Preferências de Alertas"
   - Utiliza FormRecord para campos homogêneos com tipagem estrita
   - Ideal para configurações dinâmicas

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão |
|------------|--------|
| **Angular** | 21.1.0 |
| **TypeScript** | 5.9.2 |
| **Reactive Forms** | 21.1.0 |
| **RxJS** | 7.8.0 |
| **Vitest** | 4.0.8 |

---

## 🚀 Como Usar

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
ng serve
# Acesse http://localhost:4200/
```

### Testes
```bash
ng test
# ou
npm test
```

### Build para Produção
```bash
npm run build
```

---

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── app.ts                      # Componente principal
│   ├── app.html                    # Template
│   ├── app.css                     # Estilos
│   ├── app.routes.ts               # Rotas
│   ├── app.config.ts               # Configuração
│   ├── app.spec.ts                 # Testes
│   └── notification-preferences.ts # Componente FormRecord
├── main.ts                         # Inicialização
├── index.html                      # HTML principal
└── styles.css                      # Estilos globais
```

---

## 📝 Componentes Principais

### 1️⃣ AppComponent - Formulário Reactivo

**Campos:**
- Nome Completo (min 5 caracteres)
- E-mail (validação de email)
- Telefone (padrão: (xx) xxxxx-xxxx)
- Departamento (select)
- Data de Admissão (date)
- Salário Base (número, mínimo 0)
- Nível de Educação (select)
- Competências Técnicas (FormArray dinâmico)

**Recursos:**
- Validação em tempo real
- FormArray para campos dinâmicos
- Reset automático após submit
- Mensagem de sucesso

### 2️⃣ NotificationPreferencesComponent - FormRecord

**Campos (FormRecord<boolean>):**
- Alertas Urgentes
- Atualizações Semanais
- Relatórios Mensais
- Notificações RH
- Comunicados da Empresa

**Recursos:**
- Tipagem genérica
- Iteração dinâmica
- Badge de status (Ativo/Inativo)

---

## 🎨 Design

- Gradiente roxo-azul no fundo
- Cards com sombra suave
- Validação visual em tempo real
- Responsividade para mobile
- Feedback de sucesso/erro

---

## 📚 Conceitos Implementados

### FormBuilder
Facilita a criação de FormGroups, FormControls e FormArrays

### Validators
- `required` - Campo obrigatório
- `minLength(n)` - Comprimento mínimo
- `email` - Validação de email
- `pattern(regex)` - Validação com regex
- `min(value)` - Valor mínimo numérico

### FormArray
Estrutura dinâmica para múltiplos campos do mesmo tipo

### FormRecord
Estrutura genérica para campos homogêneos com tipagem estrita

---

## 🧪 Testes Inclusos

- Criação do componente
- Inicialização do FormArray
- Adição de competências
- Remoção de competências
- Validação do formulário

---

## 📊 Diferenças do Código de Referência

Para evitar plágio:

| Aspecto | Referência | Este Projeto |
|--------|---|---|
| **Temática** | Censo Acadêmico | Cadastro de Colaboradores |
| **FormArray** | Idiomas | Competências |
| **FormRecord** | Privacidade | Notificações |
| **Design** | Azul com topo | Gradiente roxo |
| **Campos** | 11 campos | 8 campos |

---

## 🔧 Como Criar um PR

### 1. Criar Branch
```bash
git checkout -b feature/tarefa-12-reactive-forms
```

### 2. Fazer Commits
```bash
git add .
git commit -m "feat: implementar tarefa 12 com reactive forms"
```

### 3. Push
```bash
git push origin feature/tarefa-12-reactive-forms
```

### 4. Criar PR no GitHub
- Clicar "New Pull Request"
- Selecionar a branch criada
- Adicionar título e descrição
- Solicitar reviewers
- Criar PR

---

## ✨ Aprendizados

✅ Reactive Forms
✅ FormArray e FormRecord
✅ Validação de formulários
✅ Angular Standalone Components
✅ Testes unitários
✅ Git workflow com PRs