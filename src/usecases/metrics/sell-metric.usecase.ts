import { EventLog } from "ethers";
import { TxDebugTraceModel } from "../../model/tx-debug-trace.model";
import { env } from "../../env-schema";

interface SellMetricUseCaseRequest {
  txDebugTrace: TxDebugTraceModel[];
  user_addresses: string[];
  txOtm: (EventLog & {
    operation: string;
  })[];
}

export class SellMetricUseCase {
  exec({ txDebugTrace, user_addresses, txOtm }: SellMetricUseCaseRequest) {
    const sell_list: {
      bribe: BigInt;
      value: BigInt;
      hash: string;
      otmIndex: number;
    }[] = [];

    for (var otmIndex in txOtm) {
      const otm = txOtm[otmIndex];
      const trace: any = txDebugTrace[otmIndex];

      if (otm.operation == "sell") {
        const sell: {
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
          sell.value += BigInt(traceLog.value) as any;
          sell.hash = otm.transactionHash;
        }
        sell_list.push(sell);
      }
    }
    return sell_list;
  }
}
