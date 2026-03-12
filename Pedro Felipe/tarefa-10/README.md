# Sistema de Monitoramento Logístico - Desafio RxJS

Projeto de monitoramento em tempo real, focado em consolidar fluxos de telemetria (GPS), pedidos e alertas operacionais.

## 1. Como rodar o projeto

Siga os comandos abaixo no seu terminal (dentro da pasta do projeto):

1. Instale as dependências: `npm install`
2. Execute a aplicação: `npm start` (ou `npx ts-node src/main.ts`)
3. O sistema rodará automaticamente por **30 segundos** antes de encerrar todas as conexões via `destroy$`.

## 2. Descrição dos Streams

* **`gps$`**: Emite a cada 1 segundo as coordenadas (`lat`, `lng`), a velocidade e o `entregadorId`.
* **`pedidos$`**: Fluxo de atualizações de status (coletado, em rota, entregue, falhou). Possui 10% de chance de erro simulado com tratamento via `retry(3)` e `catchError`.
* **`alertas$`**: Notificações de sistema em intervalos aleatórios (3-8 segundos) com diferentes níveis de severidade (baixa, média, alta).
* **`painelEntregador$`**: Stream consolidado que agrupa o estado mais recente de cada entregador combinando GPS e Pedidos.
* **`emergencia$`**: Stream que detecta situações críticas quando um alerta de severidade alta é emitido e o entregador está acima de 60 km/h.
* **`statusCount$`**: Placar acumulado de eventos por status (KPIs de entrega).

## 3. Justificativa da Tarefa 3.1: Uso de `combineLatest`

Para a consolidação do painel, a escolha técnica foi o operador **`combineLatest`**.

* **Justificativa**: Como os eventos de GPS e Pedidos ocorrem de forma assíncrona e independente, o `combineLatest` permite que o sistema reaja a AMBAS as fontes assim que qualquer uma delas emite um novo dado. Diferentemente de `zip` (que espera sincronização) ou `withLatestFrom` (que reage apenas a uma fonte), o `combineLatest` garante que o painel sempre mostre a combinação mais recente de ambos os fluxos. Isso oferece uma visão consolidada e atualizada de cada entregador em tempo real.

## 4. Implementação da Tarefa 3.2 (Dashboard de Emergência)

Na Tarefa 3.2, implementei a lógica de detecção de emergências usando **`withLatestFrom`** e validação de timestamp.

A abordagem funciona da seguinte forma:
1. Filtramos `alertas$` por severidade `'alta'`
2. Usamos `withLatestFrom(gps$)` para capturar o GPS mais recente no momento do alerta
3. Validamos três condições simultaneamente:
   - Mesmo `entregadorId` (alerta e GPS referem-se ao mesmo entregador)
   - Velocidade GPS acima de 60 km/h
   - Diferença de timestamp entre alerta e GPS menor que 5 segundos

Quando todas as três condições são satisfeitas, uma emergência é disparada com os dados consolidados.

## 5. Dificuldades Enfrentadas e Soluções

### O Desafio dos Imports de RxJS
Uma das maiores dificuldades foi entender corretamente a estrutura de imports do RxJS v7+. Inicialmente, tentei importar operadores da raiz do pacote, quando na verdade alguns deles devem vir de locais específicos.

* **Solução**: Organizou-se os imports corretamente separando operadores e funções de criação, importando de `'rxjs'` e `'rxjs/operators'` conforme apropriado.

### Tratamento de Erros com Throwable Interruption
O stream de `pedidos$` lançava erros que encerravam o sistema. Isso ocorria porque o `throwError()` dentro de um `switchMap` terminava o observable inteiro.

* **Solução**: Implementamos o tratamento de erro DENTRO do `switchMap`, aplicando `retry(3)` e `catchError` para retornar um objeto especial com `status: 'erro'`, mantendo o stream ativo e permitindo que o sistema continue monitorando.

### Correlação de Entregadores em `combineLatest`
O `combineLatest([gps$, pedidos$])` emite para TODA combinação possível de GPS e Pedidos, independente de qual entregador os dados referem.

* **Solução**: Aplicamos um `filter()` após o `combineLatest()` para validar que `gps.entregadorId === pedido.entregadorId`, garantindo que apenas dados do mesmo entregador sejam consolidados no painel.

---

**Arquivos Principais:**
- `src/streams/`: Contém gps.stream.ts, pedidos.stream.ts e alertas.stream.ts
- `src/transformacoes.ts`: Implementação de todas as transformações e combinações (Tarefas 2 e 3)
- `src/operadores/custom.operadores.ts`: Operador customizado `logComTimestamp`
- `src/main.ts`: Subscrições organizadas e ciclo de vida com `destroy$`

**Pontuação Esperada**: 100 + bônus (README explicativo, código limpo e tentativa documentada)


