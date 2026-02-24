import Fastify, { FastifyInstance } from 'fastify';
import { registerRoutes } from '../src/app.module';

describe('App (e2e)', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = Fastify();
    await registerRoutes(app);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /', () => {
    it('deve retornar informações da API', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.name).toBe('API de Tarefas - Tarefa 08');
    });
  });

  describe('GET /tarefas', () => {
    it('deve retornar lista de tarefas', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/tarefas',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.sucesso).toBe(true);
      expect(Array.isArray(body.dados)).toBe(true);
    });
  });

  describe('POST /tarefas', () => {
    it('deve criar uma tarefa', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/tarefas',
        payload: {
          titulo: 'Nova Tarefa',
          prioridade: 'alta',
          concluida: false,
        },
      });

      expect(response.statusCode).toBe(201);
      const body = JSON.parse(response.body);
      expect(body.sucesso).toBe(true);
      expect(body.dados.titulo).toBe('Nova Tarefa');
    });
  });

  describe('GET /tarefas/:id', () => {
    it('deve retornar tarefa por ID', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/tarefas/1',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.sucesso).toBe(true);
      expect(body.dados.id).toBe(1);
    });
  });

  describe('GET /tarefas/stats', () => {
    it('deve retornar estatísticas', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/tarefas/stats',
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.sucesso).toBe(true);
      expect(body.dados.total).toBeGreaterThan(0);
    });
  });

  describe('POST /tarefas/by-priorities', () => {
    it('deve retornar tarefas por prioridade (Promise.all)', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/tarefas/by-priorities',
        payload: {
          priorities: ['alta', 'media', 'baixa'],
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.sucesso).toBe(true);
      expect(body.dados.alta).toBeDefined();
    });
  });
});
