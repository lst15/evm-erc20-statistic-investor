import { env } from "../../env-schema";
import { TxDebugTraceModel } from "../../model/tx-debug-trace.model";
import { RequestsInterface } from "../../repository/interfaces/requests.interface";

interface TxDebugTraceUseCaseRequest {
  transactionHash: string;
}

class TxDebugTraceUseCase {
  constructor(private requestRepository: RequestsInterface) {}

  async exec({
    transactionHash,
  }: TxDebugTraceUseCaseRequest): Promise<TxDebugTraceModel[]> {
    const request = await this.requestRepository.post(
      env.LOW_LEVEL_RPC,
      "debug_traceTransaction",
      [
        transactionHash,
        {
          tracer: "callTracer",
        },
      ],
      1
    );

    return request.data.result.calls;
  }
}

export { TxDebugTraceUseCase };
