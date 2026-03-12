import { Observable, combineLatest } from 'rxjs';
import { filter, map, scan, withLatestFrom } from 'rxjs/operators';

/**
 * TAREFA 2: Transformações e Filtragens
 */

// Interface para tipagem
interface DadosGPS {
  entregadorId: string;
  lat: number;
  lng: number;
  velocidade: number;
  timestamp: Date;
}

interface DadosPedido {
  pedidoId: string;
  status: 'coletado' | 'em_rota' | 'entregue' | 'falhou';
  entregadorId: string;
  timestamp: Date;
}

interface DadosAlerta {
  tipo: 'atraso' | 'veiculo_parado' | 'rota_desviada';
  entregadorId: string;
  mensagem: string;
  severidade: 'baixa' | 'media' | 'alta';
  timestamp: Date;
}

/**
 * Tarefa 2.1: Filtrar velocidade suspeita
 * Emite apenas leituras onde velocidade > 60 km/h
 */
export function criarVelocidadeSuspeitaStream(gps$: Observable<DadosGPS>) {
  return gps$.pipe(
    filter((gps) => gps.velocidade > 60)
  );
}

/**
 * Tarefa 2.2: Contar por status
 * Acumula e emite a contagem total de cada status
 * Ex: { entregue: 3, falhou: 1, em_rota: 5, coletado: 2 }
 */
export function criarStatusCountStream(pedidos$: Observable<DadosPedido>) {
  return pedidos$.pipe(
    scan((acumulador: any, pedido) => {
      acumulador[pedido.status] = (acumulador[pedido.status] || 0) + 1;
      return { ...acumulador };
    }, { entregue: 0, falhou: 0, em_rota: 0, coletado: 0 })
  );
}

/**
 * Tarefa 2.3: Filtrar alertas críticos
 * Emite apenas alertas com severidade 'alta' ou 'media'
 */
export function criarAlertasCriticosStream(alertas$: Observable<DadosAlerta>) {
  return alertas$.pipe(
    filter((alerta) => alerta.severidade === 'alta' || alerta.severidade === 'media')
  );
}

/**
 * Tarefa 2.4: Enriquecer dados de GPS
 * Adiciona campo 'regiao' com base na latitude
 * lat > 0 = 'Norte', lat <= 0 = 'Sul'
 */
export function criarGpsEnriquecidoStream(gps$: Observable<DadosGPS>) {
  return gps$.pipe(
    map((gps) => ({
      ...gps,
      regiao: gps.lat > 0 ? 'Norte' : 'Sul'
    }))
  );
}

/**
 * TAREFA 3: Combinação de Streams
 */

/**
 * Tarefa 3.1: Painel do Entregador
 * Combina gps$ e pedidos$ para gerar visão consolidada
 * Emite quando qualquer um dos dois tiver atualização
 *
 * Operador escolhido: combineLatest
 * Justificativa: Sempre emite quando há nova atualização em qualquer stream,
 * mantendo o estado sincronizado dos dados mais recentes de ambos.
 */
export interface DadosPainelEntregador {
  entregadorId: string;
  ultimaLocalizacao: {
    lat: number;
    lng: number;
    velocidade: number;
  };
  ultimoStatus: string;
  ultimaAtualizacao: Date;
}

export function criarPainelEntregadorStream(
  gps$: Observable<DadosGPS>,
  pedidos$: Observable<DadosPedido>
) {
  return combineLatest([gps$, pedidos$]).pipe(
    filter(([gps, pedido]) => gps.entregadorId === pedido.entregadorId),
    map(([gps, pedido]): DadosPainelEntregador => ({
      entregadorId: gps.entregadorId,
      ultimaLocalizacao: {
        lat: gps.lat,
        lng: gps.lng,
        velocidade: gps.velocidade
      },
      ultimoStatus: pedido.status,
      ultimaAtualizacao: new Date()
    }))
  );
}

/**
 * Tarefa 3.2: Dashboard de Emergência
 * Detecta quando AMBAS as condições ocorrem dentro de 5 segundos:
 * 1. Alerta com severidade 'alta'
 * 2. Mesmo entregador com velocidade > 60 km/h
 *
 * Estratégia: withLatestFrom para capturar GPS mais recente quando alerta ocorre
 */
export interface DadosEmergencia {
  entregadorId: string;
  tipoAlerta: string;
  velocidade: number;
  severidade: string;
  timestamp: Date;
}

export function criarEmergenciaStream(
  alertas$: Observable<DadosAlerta>,
  gps$: Observable<DadosGPS>
) {
  return alertas$.pipe(
    filter((alerta) => alerta.severidade === 'alta'),
    withLatestFrom(gps$),
    filter(([alerta, gps]) => {
      const mesmoEntregador = alerta.entregadorId === gps.entregadorId;
      const velocidadeAlta = gps.velocidade > 60;
      const dentroDoTempo = (alerta.timestamp.getTime() - gps.timestamp.getTime()) < 5000;
      return mesmoEntregador && velocidadeAlta && dentroDoTempo;
    }),
    map(([alerta, gps]): DadosEmergencia => ({
      entregadorId: alerta.entregadorId,
      tipoAlerta: alerta.tipo,
      velocidade: gps.velocidade,
      severidade: alerta.severidade,
      timestamp: new Date()
    }))
  );
}
