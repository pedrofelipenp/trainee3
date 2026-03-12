import { Observable, interval, of, throwError } from 'rxjs';
import { switchMap, retry, catchError } from 'rxjs/operators';
import { ENTREGADORES, STATUS_PEDIDOS, aleatorioEntre, aleatorioDoArray, gerarId } from '../utils/simulador';

interface DadosPedido {
  pedidoId: string;
  status: 'coletado' | 'em_rota' | 'entregue' | 'falhou';
  entregadorId: string;
  timestamp: Date;
}

export function criarPedidosStream(): Observable<DadosPedido | any> {
  return interval(2000).pipe(
    switchMap(() => {
      if (Math.random() < 0.1) {
        return throwError(() => new Error('Falha na comunica��o com o servidor')).pipe(
          retry(3),
          catchError(() => {
            return of({
              pedidoId: 'ERRO',
              status: 'erro',
              entregadorId: 'DESCONHECIDO',
              timestamp: new Date(),
              mensagem: 'Falha na comunica��o com o servidor - recuperado'
            });
          })
        );
      }

      const dado: DadosPedido = {
        pedidoId: gerarId('PED'),
        status: aleatorioDoArray(STATUS_PEDIDOS) as any,
        entregadorId: aleatorioDoArray(ENTREGADORES),
        timestamp: new Date()
      };
      return of(dado);
    })
  );
}
