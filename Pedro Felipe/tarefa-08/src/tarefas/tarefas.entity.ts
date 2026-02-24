export interface Tarefa {
  id: number;
  titulo: string;
  descricao?: string;
  prioridade: 'baixa' | 'media' | 'alta';
  concluida: boolean;
  dataCriacao: Date;
  dataAtualizacao: Date;
}
