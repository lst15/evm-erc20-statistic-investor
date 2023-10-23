import { EventLog } from "ethers";
import { TxOtmModel } from "../../model/tx-otm.model";
import { Web3Interface } from "../../repository/interfaces/web3.interface";

interface GasMetricsUseCaseRequest {
  txOtm: (EventLog & {
    operation: string;
  })[];
}

export class GasMetricsUseCase {
  constructor(private web3Repository: Web3Interface) {}

  async exec({ txOtm }: GasMetricsUseCaseRequest) {
    const metriclist: any = [];
    for (var eventIndex in txOtm) {
      const event = txOtm[eventIndex];

      const receipt = await this.web3Repository.getTransactionReceipt(
        event.transactionHash
      );

      const transactionFee = BigInt(receipt.gasUsed) * BigInt(receipt.gasPrice);
      metriclist[eventIndex] = transactionFee;
    }
    return metriclist;
  }
}
