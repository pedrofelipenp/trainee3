import { FastifyInstance } from 'fastify';
import { tarefasController } from './tarefas.controller';

export async function registerTarefasRoutes(app: FastifyInstance) {
  app.get('/tarefas', (req, reply) => tarefasController.findAll(req, reply));

  app.get<{ Params: { id: string } }>(
    '/tarefas/:id',
    (req, reply) => tarefasController.findOne(req, reply)
  );

  app.post<{ Body: any }>(
    '/tarefas',
    (req, reply) => tarefasController.create(req, reply)
  );

  app.put<{ Params: { id: string }; Body: any }>(
    '/tarefas/:id',
    (req, reply) => tarefasController.update(req, reply)
  );

  app.patch<{ Params: { id: string } }>(
    '/tarefas/:id/complete',
    (req, reply) => tarefasController.complete(req, reply)
  );

  app.delete<{ Params: { id: string } }>(
    '/tarefas/:id',
    (req, reply) => tarefasController.delete(req, reply)
  );

  app.get('/tarefas/stats', (req, reply) =>
    tarefasController.getStats(req, reply)
  );

  app.post<{ Body: any }>(
    '/tarefas/by-priorities',
    (req, reply) => tarefasController.findByPriorities(req, reply)
  );
}
