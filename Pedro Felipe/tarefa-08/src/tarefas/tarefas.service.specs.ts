import { tarefasService } from './tarefas.service';
import { CreateTarefaDto } from './dto/create-tarefa.dto';

describe('TarefasService', () => {
  describe('create', () => {
    it('deve criar uma tarefa com sucesso', async () => {
      const dto: CreateTarefaDto = {
        titulo: 'Teste',
        prioridade: 'alta',
        concluida: false,
      };

      const tarefa = await tarefasService.create(dto);
      expect(tarefa).toBeDefined();
      expect(tarefa.titulo).toBe('Teste');
      expect(tarefa.prioridade).toBe('alta');
    });

    it('deve lançar erro se título vazio', async () => {
      const dto: CreateTarefaDto = {
        titulo: '',
        prioridade: 'alta',
        concluida: false,
      };

      await expect(tarefasService.create(dto)).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    it('deve encontrar tarefa por ID', async () => {
      const tarefa = await tarefasService.findOne(1);
      expect(tarefa).toBeDefined();
      expect(tarefa.id).toBe(1);
    });

    it('deve lançar erro se tarefa não existe', async () => {
      await expect(tarefasService.findOne(999)).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('deve retornar array de tarefas', async () => {
      const tarefas = await tarefasService.findAll();
      expect(Array.isArray(tarefas)).toBe(true);
    });
  });

  describe('getStats', () => {
    it('deve retornar estatísticas', async () => {
      const stats = await tarefasService.getStats();
      expect(stats.total).toBeGreaterThan(0);
      expect(stats.concluidas).toBeGreaterThanOrEqual(0);
      expect(stats.pendentes).toBeGreaterThanOrEqual(0);
    });
  });

  describe('findByPriorities', () => {
    it('deve retornar tarefas por prioridade em paralelo', async () => {
      const result = await tarefasService.findByPriorities([
        'alta',
        'media',
        'baixa',
      ]);
      expect(result.alta).toBeDefined();
      expect(result.media).toBeDefined();
      expect(result.baixa).toBeDefined();
    });
  });
});
