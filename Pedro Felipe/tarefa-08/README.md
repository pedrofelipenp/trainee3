# Tarefa 08 - Async/Await com Fastify

Exemplo prático e simples de **async/await** em uma API REST.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Servidor em: http://localhost:3000

## 📁 Estrutura

```
src/
├── tarefas/
│   ├── dto/                      # Data Transfer Objects
│   │   ├── create-tarefa.dto.ts
│   │   └── update-tarefa.dto.ts
│   ├── tarefas.entity.ts         # Tipos/Interfaces
│   ├── tarefas.service.ts        # Lógica (async/await)
│   ├── tarefas.controller.ts     # HTTP handlers
│   ├── tarefas.module.ts         # Rotas
│   └── tarefas.service.specs.ts  # Testes unitários
├── database/
│   └── database.service.ts       # DB simulado com async
├── app.service.ts
├── app.module.ts
└── main.ts

test/
└── app.e2e.specs.ts             # Testes e2e
```

## 📝 Endpoints

```bash
# Listar todas
GET /tarefas

# Buscar por ID
GET /tarefas/:id

# Criar
POST /tarefas
{
  "titulo": "Minha tarefa",
  "prioridade": "alta",
  "concluida": false
}

# Atualizar
PUT /tarefas/:id

# Marcar como concluída
PATCH /tarefas/:id/complete

# Deletar
DELETE /tarefas/:id

# Estatísticas
GET /tarefas/stats

# Buscar por prioridades (Promise.all)
POST /tarefas/by-priorities
{
  "priorities": ["alta", "media", "baixa"]
}
```

## 🎓 Conceitos de Async/Await

### 1. Try/Catch - Tratamento de Erro
```typescript
async findOne(id: number): Promise<Tarefa> {
  try {
    const tarefa = await database.findOne(id);
    if (!tarefa) throw new Error('Não encontrada');
    return tarefa;
  } catch (error) {
    throw error;
  }
}
```

### 2. Validação Assíncrona
```typescript
async update(id: number, dto: UpdateTarefaDto): Promise<Tarefa> {
  const existe = await database.findOne(id); // Verifica antes
  if (!existe) throw new Error('Não encontrada');
  return await database.update(id, dto);      // Depois atualiza
}
```

### 3. Promise.all - Paralelo
```typescript
async findByPriorities(priorities: string[]): Promise<any> {
  // Executa 3 operações em paralelo
  const results = await Promise.all(
    priorities.map(p => database.findByPriority(p))
  );
  return results;
}
```

## 🧪 Testes

```bash
# Testes unitários
npm test

# Testes em tempo real
npm run test:watch
```

## 📊 Comparação com Callbacks

### ❌ Callbacks (Velho)
```typescript
db.find(1, (err, tarefa) => {
  if (err) return console.error(err);
  console.log(tarefa);
});
```

### ⚠️ Promises (.then)
```typescript
db.find(1).then(tarefa => console.log(tarefa)).catch(err => console.error(err));
```

### ✅ Async/Await (Melhor!)
```typescript
try {
  const tarefa = await db.find(1);
  console.log(tarefa);
} catch (err) {
  console.error(err);
}
```

## 🎯 O que Você Aprende

- ✅ Async/await básico
- ✅ Try/catch para erros
- ✅ Validação assíncrona
- ✅ Promise.all (paralelo)
- ✅ Arquitetura modular
- ✅ Testes com Jest

---

**Status**: ✅ Completo e Simples
