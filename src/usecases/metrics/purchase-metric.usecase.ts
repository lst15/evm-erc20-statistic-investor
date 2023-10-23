import { EventLog } from "ethers";
import { TxDebugTraceModel } from "../../model/tx-debug-trace.model";
import { env } from "../../env-schema";

interface PurchaseMetricUseCaseRequest {
  txDebugTrace: TxDebugTraceModel[];
  user_addresses: string[];
  txOtm: (EventLog & {
    operation: string;
  })[];
}

export class PurchaseMetricUseCase {
  exec({ txDebugTrace, user_addresses, txOtm }: PurchaseMetricUseCaseRequest) {
    const purchase_list: {
      bribe: BigInt;
      value: BigInt;
      hash: string;
      otmIndex: number;
    }[] = [];

    for (var otmIndex in txOtm) {
      const otm = txOtm[otmIndex];
      const trace: any = txDebugTrace[otmIndex];

      if (otm.operation == "buy") {
        const purchase: {
          bribe: BigInt;
          value: BigInt;
          hash: string;
          otmIndex: number;
        } = {
          value: BigInt(0),
          bribe: BigInt(0),
          hash: "",
          otmIndex: parseInt(otmIndex),
        };

        for (var traceIndex in trace) {
          const traceLog = trace[traceIndex];
          if (traceLog.value == "0x0" || !traceLog.value) continue;

          if (traceLog.to == env.WETH) {
            purchase.value += BigInt(traceLog.value) as any;
            purchase.hash = otm.transactionHash;
          }

          if (
            traceLog.to != env.WETH.toLowerCase() &&
            user_addresses.includes(traceLog.to) == false
          ) {
            purchase.bribe += BigInt(traceLog.value) as any;
          }
        }
        purchase_list.push(purchase);
      }
    }
    return purchase_list;
  }
}
