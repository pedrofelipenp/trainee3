import { Tarefa } from '../tarefas/tarefas.entity';
import { CreateTarefaDto } from '../tarefas/dto/create-tarefa.dto';
import { UpdateTarefaDto } from '../tarefas/dto/update-tarefa.dto';

export class DatabaseService {
  private tarefas: Tarefa[] = [
    {
      id: 1,
      titulo: 'Estudar Async/Await',
      descricao: 'Aprender async/await com Fastify',
      prioridade: 'alta',
      concluida: false,
      dataCriacao: new Date('2025-01-15'),
      dataAtualizacao: new Date('2025-01-15'),
    },
  ];

  private nextId = 2;

  // Listar todas
  async findAll(): Promise<Tarefa[]> {
    await this.delay(50);
    return this.tarefas;
  }

  // Buscar por ID
  async findOne(id: number): Promise<Tarefa | null> {
    await this.delay(50);
    return this.tarefas.find((t) => t.id === id) || null;
  }

  // Criar
  async create(dto: CreateTarefaDto): Promise<Tarefa> {
    await this.delay(100);
    const tarefa: Tarefa = {
      id: this.nextId++,
      ...dto,
      dataCriacao: new Date(),
      dataAtualizacao: new Date(),
    };
    this.tarefas.push(tarefa);
    return tarefa;
  }

  // Atualizar
  async update(id: number, dto: UpdateTarefaDto): Promise<Tarefa | null> {
    await this.delay(50);
    const tarefa = this.tarefas.find((t) => t.id === id);
    if (!tarefa) return null;

    Object.assign(tarefa, {
      ...dto,
      dataAtualizacao: new Date(),
    });
    return tarefa;
  }

  // Deletar
  async delete(id: number): Promise<boolean> {
    await this.delay(50);
    const index = this.tarefas.findIndex((t) => t.id === id);
    if (index === -1) return false;
    this.tarefas.splice(index, 1);
    return true;
  }

  // Por prioridade
  async findByPriority(
    prioridade: 'baixa' | 'media' | 'alta'
  ): Promise<Tarefa[]> {
    await this.delay(50);
    return this.tarefas.filter((t) => t.prioridade === prioridade);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const database = new DatabaseService();
