import { database } from '../database/database.service';
import { Tarefa } from './tarefas.entity';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';

export class TarefasService {
  // Listar todas
  async findAll(): Promise<Tarefa[]> {
    try {
      const tarefas = await database.findAll();
      return tarefas;
    } catch (error) {
      throw new Error('Erro ao listar tarefas');
    }
  }

  // Buscar por ID
  async findOne(id: number): Promise<Tarefa> {
    try {
      const tarefa = await database.findOne(id);
      if (!tarefa) throw new Error(`Tarefa ${id} não encontrada`);
      return tarefa;
    } catch (error) {
      throw error;
    }
  }

  // Criar
  async create(dto: CreateTarefaDto): Promise<Tarefa> {
    if (!dto.titulo || dto.titulo.trim().length === 0) {
      throw new Error('Título é obrigatório');
    }

    try {
      const tarefa = await database.create(dto);
      return tarefa;
    } catch (error) {
      throw new Error('Erro ao criar tarefa');
    }
  }

  // Atualizar
  async update(id: number, dto: UpdateTarefaDto): Promise<Tarefa> {
    try {
      const existe = await database.findOne(id);
      if (!existe) throw new Error(`Tarefa ${id} não encontrada`);

      const atualizada = await database.update(id, dto);
      return atualizada!;
    } catch (error) {
      throw error;
    }
  }

  // Deletar
  async delete(id: number): Promise<void> {
    try {
      const existe = await database.findOne(id);
      if (!existe) throw new Error(`Tarefa ${id} não encontrada`);

      await database.delete(id);
    } catch (error) {
      throw error;
    }
  }

  // Marcar como concluída
  async complete(id: number): Promise<Tarefa> {
    return this.update(id, { concluida: true });
  }

  // Buscar por prioridade - Exemplo de Promise.all
  async findByPriorities(
    priorities: Array<'baixa' | 'media' | 'alta'>
  ): Promise<Record<string, Tarefa[]>> {
    try {
      // Promise.all executa em paralelo
      const results = await Promise.all(
        priorities.map((priority) => database.findByPriority(priority))
      );

      const output: Record<string, Tarefa[]> = {};
      priorities.forEach((priority, index) => {
        output[priority] = results[index];
      });

      return output;
    } catch (error) {
      throw new Error('Erro ao buscar tarefas por prioridade');
    }
  }

  // Estatísticas
  async getStats(): Promise<{
    total: number;
    concluidas: number;
    pendentes: number;
  }> {
    try {
      const tarefas = await database.findAll();
      const concluidas = tarefas.filter((t) => t.concluida).length;

      return {
        total: tarefas.length,
        concluidas,
        pendentes: tarefas.length - concluidas,
      };
    } catch (error) {
      throw new Error('Erro ao obter estatísticas');
    }
  }
}

export const tarefasService = new TarefasService();
