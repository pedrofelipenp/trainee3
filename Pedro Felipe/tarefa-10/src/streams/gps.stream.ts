import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENTREGADORES, aleatorioEntre, aleatorioDoArray } from '../utils/simulador';

interface DadosGPS {
  entregadorId: string;
  lat: number;
  lng: number;
  velocidade: number;
  timestamp: Date;
}

/**
 * Tarefa 1: Stream de GPS dos Entregadores
 *
 * Emite a cada 1 segundo a localização e velocidade de um entregador.
 */
export function criarGpsStream(): Observable<DadosGPS> {
  return new Observable((observer) => {
    const subscription = interval(1000).subscribe(() => {
      const dado: DadosGPS = {
        entregadorId: aleatorioDoArray(ENTREGADORES),
        lat: aleatorioEntre(-30, 0) + Math.random(),
        lng: aleatorioEntre(-60, -30) + Math.random(),
        velocidade: aleatorioEntre(0, 80),
        timestamp: new Date()
      };
      observer.next(dado);
    });
    return () => subscription.unsubscribe();
  });
}
