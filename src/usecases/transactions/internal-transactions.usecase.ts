import { RequestsInterface } from "../../repository/interfaces/requests.interface";
import { Web3Interface } from "../../repository/interfaces/web3.interface";

interface InternalTransactionsUseCaseRequest {
  transactionHash:string;
}

class InternalTransactionsUseCase {
  constructor(private requestRepository:RequestsInterface){}

  async exec({transactionHash}:InternalTransactionsUseCaseRequest){
    const request = this.requestRepository.post(
      "https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7",
      "debug_traceTransaction",
      [
        '0x3fac854179691e377fc1aa180b71a4033b6bb3bde2a7ef00bc8e78f849ad356e',
        {
          'tracer': 'callTracer'
        }
      ],
      1,
    )
    console.log(request)
  }

}

export {InternalTransactionsUseCase}