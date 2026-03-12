import { Subject, of } from 'rxjs';
import { takeUntil, retry, catchError } from 'rxjs/operators';

import { criarGpsStream } from './streams/gps.stream';
import { criarPedidosStream } from './streams/pedidos.stream';
import { criarAlertasStream } from './streams/alertas.stream';
import {
  criarVelocidadeSuspeitaStream,
  criarStatusCountStream,
  criarAlertasCriticosStream,
  criarGpsEnriquecidoStream,
  criarPainelEntregadorStream,
  criarEmergenciaStream,
  DadosPainelEntregador
} from './transformacoes';
import { logComTimestamp } from './operadores/custom.operadores';

console.log('🚀 Iniciando Sistema de Monitoramento Reativo com RxJS\n');

/** Tarefa 4.2: Subject para gerenciamento de ciclo de vida */
const destroy$ = new Subject<void>();

/** Contadores para resumo final */
const contadores = {
  gps: 0,
  pedidos: 0,
  alertas: 0,
  velocidadeSuspeita: 0,
  pedidosComErro: 0,
  pedidosRecuperados: 0,
  alertasCriticos: 0,
  painelAtualizacoes: 0,
  emergencias: 0
};

/**
 * Criando os streams principais (Tarefa 1)
 */
const gps$ = criarGpsStream();
const pedidos$ = criarPedidosStream();
const alertas$ = criarAlertasStream();

/**
 * Tarefa 2: Criando streams transformados
 */
const velocidadeSuspeita$ = criarVelocidadeSuspeitaStream(gps$);
const statusCount$ = criarStatusCountStream(pedidos$);
const alertasCriticos$ = criarAlertasCriticosStream(alertas$);
const gpsEnriquecido$ = criarGpsEnriquecidoStream(gps$);

/**
 * Tarefa 3: Combinação de streams
 */
const painelEntregador$ = criarPainelEntregadorStream(gps$, pedidos$);
const emergencia$ = criarEmergenciaStream(alertas$, gps$);

/**
 * SUBSCRIÇÕES
 */

// Stream principal: GPS (com logging)
gps$.pipe(
  logComTimestamp('GPS'),
  takeUntil(destroy$)
).subscribe({
  next: (dado) => {
    contadores.gps++;
  },
  error: (erro) => console.error('[GPS] Erro:', erro),
  complete: () => console.log('[GPS] Stream finalizado')
});

// Tarefa 4.1: Pedidos com tratamento de erro
pedidos$.pipe(
  retry(3), // Tenta até 3 vezes antes de acionar o catchError
  catchError((erro) => {
    contadores.pedidosComErro++;
    console.error(`[PEDIDOS] Erro tratado (tentativa ${contadores.pedidosComErro}):`, erro.message);
    // Continua o stream com um objeto de erro especial
    return of({
      pedidoId: 'ERRO',
      status: 'erro' as any,
      entregadorId: 'DESCONHECIDO',
      timestamp: new Date(),
      mensagem: erro.message
    });
  }),
  logComTimestamp('PEDIDOS'),
  takeUntil(destroy$)
).subscribe({
  next: (dado: any) => {
    contadores.pedidos++;
    if (dado.status === 'erro') {
      contadores.pedidosRecuperados++;
    }
  },
  error: (erro) => console.error('[PEDIDOS] Erro não tratado:', erro),
  complete: () => console.log('[PEDIDOS] Stream finalizado')
});

// Stream de alertas
alertas$.pipe(
  logComTimestamp('ALERTAS'),
  takeUntil(destroy$)
).subscribe({
  next: (dado) => {
    contadores.alertas++;
  },
  error: (erro) => console.error('[ALERTAS] Erro:', erro),
  complete: () => console.log('[ALERTAS] Stream finalizado')
});

// Tarefa 2.1: Velocidade suspeita
velocidadeSuspeita$.pipe(
  takeUntil(destroy$)
).subscribe({
  next: (dado) => {
    contadores.velocidadeSuspeita++;
    console.log(`[VELOCIDADE SUSPEITA] ${dado.entregadorId}: ${dado.velocidade} km/h`);
  }
});

// Tarefa 2.2: Contagem de status
statusCount$.pipe(
  takeUntil(destroy$)
).subscribe({
  next: (contagem) => {
    console.log('[STATUS COUNT]', contagem);
  }
});

// Tarefa 2.3: Alertas críticos
alertasCriticos$.pipe(
  takeUntil(destroy$)
).subscribe({
  next: (alerta) => {
    contadores.alertasCriticos++;
    console.log(`[ALERTA CRÍTICO] ${alerta.entregadorId}: ${alerta.tipo} (${alerta.severidade})`);
  }
});

// Tarefa 2.4: GPS enriquecido
gpsEnriquecido$.pipe(
  takeUntil(destroy$)
).subscribe({
  next: (dado) => {
    console.log(`[GPS ENRIQUECIDO] ${dado.entregadorId}: Região ${dado.regiao}`);
  }
});

// Tarefa 3.1: Painel do entregador
painelEntregador$.pipe(
  takeUntil(destroy$)
).subscribe({
  next: (painel: DadosPainelEntregador) => {
    contadores.painelAtualizacoes++;
    console.log(`[PAINEL] ${painel.entregadorId}: Status ${painel.ultimoStatus}, Vel ${painel.ultimaLocalizacao.velocidade} km/h`);
  },
  error: (erro: any) => console.error('[PAINEL] Erro:', erro)
});

// Tarefa 3.2: Dashboard de emergência
emergencia$.pipe(
  takeUntil(destroy$)
).subscribe({
  next: (emerg) => {
    contadores.emergencias++;
    console.log(`🚨 [EMERGÊNCIA] ${emerg.entregadorId}: ${emerg.tipoAlerta} a ${emerg.velocidade} km/h!`);
  },
  error: (erro) => console.error('[EMERGÊNCIA] Erro:', erro)
});

/**
 * Tarefa 4.2: Finalizando após 30 segundos
 */
setTimeout(() => {
  console.log('\n⏸️  Finalizando streams após 30 segundos...\n');
  destroy$.next();
  destroy$.complete();

  // Resumo final
  console.log('📊 RESUMO DE EVENTOS PROCESSADOS:');
  console.log(`  ├─ GPS: ${contadores.gps} eventos`);
  console.log(`  ├─ Pedidos: ${contadores.pedidos} eventos`);
  console.log(`  │   ├─ Erros tratados: ${contadores.pedidosComErro}`);
  console.log(`  │   └─ Recuperados: ${contadores.pedidosRecuperados}`);
  console.log(`  ├─ Alertas: ${contadores.alertas} eventos`);
  console.log(`  │   └─ Críticos: ${contadores.alertasCriticos}`);
  console.log(`  ├─ Velocidade Suspeita: ${contadores.velocidadeSuspeita} eventos`);
  console.log(`  ├─ Painel Entregador: ${contadores.painelAtualizacoes} atualizações`);
  console.log(`  └─ Emergências Detectadas: ${contadores.emergencias}`);
  console.log('\n✅ Desafio RxJS completado!');

  process.exit(0);
}, 30000);
