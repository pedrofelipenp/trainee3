import { Observable } from 'rxjs';
import { ENTREGADORES, TIPOS_ALERTAS, SEVERIDADES, aleatorioDoArray } from '../utils/simulador';

interface DadosAlerta {
  tipo: 'atraso' | 'veiculo_parado' | 'rota_desviada';
  entregadorId: string;
  mensagem: string;
  severidade: 'baixa' | 'media' | 'alta';
  timestamp: Date;
}

/**
 * Tarefa 1: Stream de Alertas do Sistema
 *
 * Emite em intervalos aleatórios (3-8 segundos) notificações de alerta.
 * Usa setTimeout recursivo para simular intervalos aleatórios.
 */
export function criarAlertasStream(): Observable<DadosAlerta> {
  return new Observable((observer) => {
    function agendarProximoAlerta() {
      const intervalo = Math.random() * 5000 + 3000; // 3-8 segundos
      const timer = setTimeout(() => {
        const dado: DadosAlerta = {
          tipo: aleatorioDoArray(TIPOS_ALERTAS) as any,
          entregadorId: aleatorioDoArray(ENTREGADORES),
          mensagem: `Alerta de sistema para entregador`,
          severidade: aleatorioDoArray(SEVERIDADES) as any,
          timestamp: new Date()
        };
        observer.next(dado);
        agendarProximoAlerta();
      }, intervalo);
      return timer;
    }
    const timerId = agendarProximoAlerta();
    return () => clearTimeout(timerId as any);
  });
}
