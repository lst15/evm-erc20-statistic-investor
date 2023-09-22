import { env } from "../../env-schema";
import { TxDebugTraceModel } from "../../model/tx-debug-trace.model";
import { TxTraceMetrics } from "../../model/tx-trace-metrics-model";

interface TraceMetricsUseCaseRequest {
  txDebugTrace: any;
  user_address: string;
}

export class TraceMetricsUseCase {
  exec({ txDebugTrace, user_address }: TraceMetricsUseCaseRequest) {
    const metriclist: any = [];
    for (var groupIndex in txDebugTrace) {
      const group = txDebugTrace[groupIndex];
      metriclist.push([]);

      for (var traceTransactionIndex in group) {
        const traceTransaction = group[traceTransactionIndex];

        let metrics: TxTraceMetrics = {
          bribe: BigInt(0),
          devolution: BigInt(0),
          purchase: BigInt(0),
          received_onSell: BigInt(0),
        };

        for (var transactionIndex in traceTransaction) {
          const transaction = traceTransaction[transactionIndex];

          if (
            transaction.from == env.MAESTRO_ROUTER ||
            transaction.from == env.BANANA_ROUTER ||
            transaction.from == env.ROUTER
          ) {
            if (!transaction.value) continue;
            if (
              transaction.to == env.MAESTRO_ANTBUILDER ||
              transaction.to == env.BANANA_BEAVEBUILDER
            ) {
              console.log(transaction.gasUsed);
              metrics.bribe += BigInt(transaction.value);
            }
            if (transaction.to == env.WETH) {
              metrics.purchase += BigInt(transaction.value);
            }
            if (transaction.to == user_address) {
              metrics.devolution += BigInt(transaction.value);
            }
          }
          if (
            transaction.from == env.ROUTER &&
            transaction.to == user_address
          ) {
            if (!transaction.value) continue;
            metrics.received_onSell += BigInt(transaction.value);
          }
        }
        metriclist[groupIndex][traceTransactionIndex] = metrics;
      }
    }
    return metriclist;
  }
}
