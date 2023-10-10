import { env } from "../../env-schema";
import { TxDebugTraceModel } from "../../model/tx-debug-trace.model";
import { TxTraceMetrics } from "../../model/tx-trace-metrics-model";

interface TraceMetricsUseCaseRequest {
  txDebugTrace: any;
  user_address: string;
  txOtm: any;
}

export class TraceMetricsUseCase {
  exec({ txDebugTrace, user_address, txOtm }: TraceMetricsUseCaseRequest) {
    const metriclist: any = [];
    for (var groupIndex in txDebugTrace) {
      const group = txDebugTrace[groupIndex];
      metriclist.push([]);

      for (var traceTransactionIndex in group) {
        const traceTransaction = group[traceTransactionIndex];
        const txOtmTransaction = txOtm[traceTransactionIndex];

        let metrics: TxTraceMetrics = {
          bribe: BigInt(0),
          devolution: BigInt(0),
          purchase: BigInt(0),
          received_onSell: BigInt(0),
        };

        for (var transactionIndex in traceTransaction) {
          const transaction = traceTransaction[transactionIndex];
          //console.log(transaction.input);
          if (
            transaction.from == env.MAESTRO_ROUTER ||
            transaction.from == env.BANANA_ROUTER ||
            transaction.from == env.ROUTER
          ) {
            if (!transaction.value) continue;
            if (
              //transaction.to == env.MAESTRO_ANTBUILDER ||
              //transaction.to == env.BANANA_BEAVEBUILDER
              transaction.to != env.WETH.toLowerCase() &&
              transaction.to != user_address
            ) {
              metrics.bribe += BigInt(transaction.value);
            }
            if (
              transaction.to == env.WETH &&
              txOtmTransaction.operation == "buy"
            ) {
              metrics.purchase += BigInt(transaction.value);
            }
          }
          if (
            transaction.to == user_address &&
            txOtmTransaction.operation == "sell"
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
