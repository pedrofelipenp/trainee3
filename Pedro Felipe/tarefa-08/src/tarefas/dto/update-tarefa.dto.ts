export class UpdateTarefaDto {
  titulo?: string;
  descricao?: string;
  prioridade?: 'baixa' | 'media' | 'alta';
  concluida?: boolean;
}
