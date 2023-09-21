import { ethers } from "ethers";
import { env } from "../../env-schema";
import { TxTracerModel } from "../../model/internal-transactios.model";
import { RequestsInterface } from "../../repository/interfaces/requests.interface";
import { Web3Interface } from "../../repository/interfaces/web3.interface";

interface TxTracerUseCaseRequest {
  transactionHash: string;
}

class TxTracerUseCase {
  constructor(private requestRepository: RequestsInterface) {}

  async exec({ transactionHash }: TxTracerUseCaseRequest) {
    const internal_transactions: TxTracerModel[] = [];

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

    const calls = request.data.result.calls;

    calls.forEach((call: any) => {
      internal_transactions.push({
        from: call.from,
        to: call.to,
        value: call.value ? ethers.formatEther(call.value) : call.value,
      });
    });

    return calls;
  }
}

export { TxTracerUseCase };
