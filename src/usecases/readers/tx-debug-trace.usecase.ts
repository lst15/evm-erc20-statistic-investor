import { EventLog } from "ethers";
import { env } from "../../env-schema";
import { TxDebugTraceModel } from "../../model/tx-debug-trace.model";
import { RequestsInterface } from "../../repository/interfaces/requests.interface";

interface TxDebugTraceUseCaseRequest {
  txOtm: (EventLog & {
    operation: string;
  })[];
}

class TxDebugTraceUseCase {
  constructor(private requestRepository: RequestsInterface) {}

  async exec({ txOtm }: TxDebugTraceUseCaseRequest) {
    let debugTraceList: any = [];

    for (var eventIndex in txOtm) {
      const eventLog = txOtm[eventIndex];

      try {
        const debugTrace = await this.requestRepository.debugTraceTransaction(
          eventLog.transactionHash
        );
        debugTraceList.push(debugTrace);
      } catch (error: any) {
        return error;
      }
    }

    return debugTraceList;
  }
}

export { TxDebugTraceUseCase };
