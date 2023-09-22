import { bigint } from "zod";
import { env } from "../../env-schema";
import { TxDebugTraceModel } from "../../model/tx-debug-trace.model";
import { TxTraceMetrics } from "../../model/tx-trace-metrics-model";

interface BananaServiceMetricsUseCaseRequest {
  txDebugTrace: TxDebugTraceModel[];
  user_address: string;
}

export class BananaServiceMetricsUseCase {
  exec({ txDebugTrace, user_address }: BananaServiceMetricsUseCaseRequest) {
    let metrics: TxTraceMetrics = {
      bribe: BigInt(0),
      devolution: BigInt(0),
      purchase: BigInt(0),
    };

    txDebugTrace.forEach((transaction: TxDebugTraceModel) => {
      if (transaction.from == env.BANANA_ROUTER) {
        if (!transaction.value) return;

        if (transaction.to == env.BANANA_BEAVEBUILDER) {
          metrics.bribe += BigInt(transaction.value);
        }

        if (transaction.to == env.WETH) {
          metrics.purchase += BigInt(transaction.value);
        }

        if (transaction.to == user_address) {
          metrics.devolution += BigInt(transaction.value);
        }
      }
    });

    return metrics;
  }
}
