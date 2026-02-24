export class AppService {
  async getInfo() {
    return {
      name: 'API de Tarefas - Tarefa 08',
      description: 'Exemplo prático de async/await com Fastify',
      version: '1.0.0',
      endpoints: {
        getTarefas: 'GET /tarefas',
        getTarefa: 'GET /tarefas/:id',
        createTarefa: 'POST /tarefas',
        updateTarefa: 'PUT /tarefas/:id',
        completeTarefa: 'PATCH /tarefas/:id/complete',
        deleteTarefa: 'DELETE /tarefas/:id',
        getStats: 'GET /tarefas/stats',
        findByPriorities: 'POST /tarefas/by-priorities',
      },
    };
  }
}

export const appService = new AppService();
