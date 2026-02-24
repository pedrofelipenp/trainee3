import { FastifyRequest, FastifyReply } from 'fastify';
import { tarefasService } from './tarefas.service';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';

export class TarefasController {
  async findAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const tarefas = await tarefasService.findAll();
      return { sucesso: true, dados: tarefas };
    } catch (error: any) {
      return reply.code(500).send({ sucesso: false, erro: error.message });
    }
  }

  async findOne(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const tarefa = await tarefasService.findOne(Number(id));
      return { sucesso: true, dados: tarefa };
    } catch (error: any) {
      return reply.code(404).send({ sucesso: false, erro: error.message });
    }
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const dto = request.body as CreateTarefaDto;
      const tarefa = await tarefasService.create(dto);
      return reply.code(201).send({ sucesso: true, dados: tarefa });
    } catch (error: any) {
      return reply.code(400).send({ sucesso: false, erro: error.message });
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const dto = request.body as UpdateTarefaDto;
      const tarefa = await tarefasService.update(Number(id), dto);
      return { sucesso: true, dados: tarefa };
    } catch (error: any) {
      return reply.code(400).send({ sucesso: false, erro: error.message });
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      await tarefasService.delete(Number(id));
      return reply.code(204).send();
    } catch (error: any) {
      return reply.code(404).send({ sucesso: false, erro: error.message });
    }
  }

  async complete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const tarefa = await tarefasService.complete(Number(id));
      return { sucesso: true, dados: tarefa };
    } catch (error: any) {
      return reply.code(404).send({ sucesso: false, erro: error.message });
    }
  }

  async getStats(request: FastifyRequest, reply: FastifyReply) {
    try {
      const stats = await tarefasService.getStats();
      return { sucesso: true, dados: stats };
    } catch (error: any) {
      return reply.code(500).send({ sucesso: false, erro: error.message });
    }
  }

  async findByPriorities(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { priorities } = request.body as {
        priorities: Array<'baixa' | 'media' | 'alta'>;
      };
      const result = await tarefasService.findByPriorities(priorities);
      return { sucesso: true, dados: result };
    } catch (error: any) {
      return reply.code(400).send({ sucesso: false, erro: error.message });
    }
  }
}

export const tarefasController = new TarefasController();
