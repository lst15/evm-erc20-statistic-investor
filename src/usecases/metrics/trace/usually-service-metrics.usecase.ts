import { bigint } from "zod";
import { env } from "../../env-schema";
import { TxDebugTraceModel } from "../../model/tx-debug-trace.model";
import { TxTraceMetrics } from "../../model/tx-trace-metrics-model";

interface UsuallyServiceMetricsUseCaseRequest {
  txDebugTrace: TxDebugTraceModel[];
  user_address: string;
}

export class UsuallyServiceMetricsUseCase {
  exec({ txDebugTrace, user_address }: UsuallyServiceMetricsUseCaseRequest) {
    let metrics: TxTraceMetrics = {
      bribe: BigInt(0),
      devolution: BigInt(0),
      purchase: BigInt(0),
    };

    txDebugTrace.forEach((transaction: TxDebugTraceModel) => {
      console.log(transaction);
      if (transaction.from == env.ROUTER) {
        if (!transaction.value) return;

        if (transaction.to == env.WETH) {
          metrics.purchase += BigInt(transaction.value);
        }
      }
    });

    return metrics;
  }
}
