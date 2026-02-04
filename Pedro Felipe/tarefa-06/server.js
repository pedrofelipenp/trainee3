const fastify = require('fastify')({ logger: true });

// Dados em memória (Mock)
let tarefas = [
  { id: 1, titulo: 'Estudar Node.js', concluida: false },
];

// --- ROTA DE BOAS-VINDAS ---q
fastify.get('/', async (request, reply) => {
  return { 
    mensagem: 'Bem-vindo à minha API de Tarefas!',
    instrucoes: 'Acesse /tarefas para ver a lista completa.' 
  };
});

// 1. LISTAR TODOS (GET)
fastify.get('/tarefas', async (request, reply) => {
  return tarefas;
});

// 2. BUSCAR POR ID (GET)
fastify.get('/tarefas/:id', async (request, reply) => {
  const { id } = request.params;
  const tarefa = tarefas.find(t => t.id === Number(id));
  
  if (!tarefa) {
    return reply.code(404).send({ erro: 'Tarefa não encontrada' });
  }
  return tarefa;
});

// 3. CRIAR (POST)
fastify.post('/tarefas', async (request, reply) => {
  const { titulo } = request.body;
  const novaTarefa = {
    id: tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1,
    titulo,
    concluida: false
  };
  tarefas.push(novaTarefa);
  return reply.code(201).send(novaTarefa);
});

// 4. ATUALIZAR (PUT)
fastify.put('/tarefas/:id', async (request, reply) => {
  const { id } = request.params;
  const { titulo, concluida } = request.body;
  
  const index = tarefas.findIndex(t => t.id === Number(id));
  if (index === -1) return reply.code(404).send({ erro: 'Não encontrada' });

  tarefas[index] = { ...tarefas[index], titulo, concluida };
  return tarefas[index];
});

// 5. REMOVER (DELETE)
fastify.delete('/tarefas/:id', async (request, reply) => {
  const { id } = request.params;
  tarefas = tarefas.filter(t => t.id !== Number(id));
  return reply.code(204).send(); 
});

// Inicialização do Servidor
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('🚀 Servidor rodando em http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();