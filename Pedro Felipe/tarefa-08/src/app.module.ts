import { FastifyInstance } from 'fastify';
import { appService } from './app.service';
import { registerTarefasRoutes } from './tarefas/tarefas.module';

export async function registerRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    return appService.getInfo();
  });

  await registerTarefasRoutes(app);
}
