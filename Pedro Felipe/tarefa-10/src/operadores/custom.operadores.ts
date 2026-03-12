import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Tarefa 5: Operador Customizado
 *
 * Operador que exibe no console o valor emitido com timestamp da emissão.
 * Deixa o valor passar sem alteração.
 *
 * Uso:
 * gps$.pipe(
 *   logComTimestamp('GPS'),
 *   filter(x => x.velocidade > 60)
 * ).subscribe(...)
 *
 * Saída:
 * [GPS] 14:32:01.452 → { entregadorId: 'ENT-002', velocidade: 73, ... }
 */
export function logComTimestamp<T>(label: string = 'LOG') {
  return (source: Observable<T>) => {
    return source.pipe(
      tap((valor: T) => {
        const agora = new Date();
        const horas = String(agora.getHours()).padStart(2, '0');
        const minutos = String(agora.getMinutes()).padStart(2, '0');
        const segundos = String(agora.getSeconds()).padStart(2, '0');
        const milisegundos = String(agora.getMilliseconds()).padStart(3, '0');
        
        const timestamp = `${horas}:${minutos}:${segundos}.${milisegundos}`;
        console.log(`[${label}] ${timestamp} → `, valor);
      })
    );
  };
}
