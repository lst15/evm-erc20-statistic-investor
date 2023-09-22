import { env } from "../../env-schema";
import { TxDebugTraceModel } from "../../model/tx-debug-trace.model";
import { RequestsInterface } from "../../repository/interfaces/requests.interface";

interface TxDebugTraceUseCaseRequest {
  txSeparator: any;
}

class TxDebugTraceUseCase {
  constructor(private requestRepository: RequestsInterface) {}

  async exec({ txSeparator }: TxDebugTraceUseCaseRequest) {
    let debugTraceList: any = [];

    for (var groupIndex in txSeparator) {
      const group = txSeparator[groupIndex];
      debugTraceList.push([]);

      for (var transactionIndex in group) {
        const transaction = group[transactionIndex];
        const debugTrace = await this.requestRepository.debugTraceTransaction(
          transaction.transactionHash
        );
        debugTraceList[groupIndex][transactionIndex] = debugTrace;
      }
    }

    return debugTraceList;
  }
}

export { TxDebugTraceUseCase };
