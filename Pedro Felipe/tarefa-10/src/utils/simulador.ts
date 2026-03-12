/**
 * Utilitários para simulação de dados
 *
 * Coloque aqui funções auxiliares para gerar dados simulados,
 * como IDs de entregadores, pedidos, coordenadas, etc.
 */

export const ENTREGADORES = [
  'ENT-001',
  'ENT-002',
  'ENT-003',
  'ENT-004',
  'ENT-005'
];

export const STATUS_PEDIDOS = [
  'coletado',
  'em_rota',
  'entregue',
  'falhou'
];

export const TIPOS_ALERTAS = [
  'atraso',
  'veiculo_parado',
  'rota_desviada'
];

export const SEVERIDADES = [
  'baixa',
  'media',
  'alta'
];

/**
 * Gera um número aleatório entre min e max
 */
export function aleatorioEntre(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Seleciona um elemento aleatório de um array
 */
export function aleatorioDoArray<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Gera um ID único (simples)
 */
export function gerarId(prefixo: string): string {
  return `${prefixo}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
