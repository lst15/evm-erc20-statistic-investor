import { EventLog } from "ethers";
import { Web3Interface } from "../../repository/interfaces/web3.interface";

interface GasApproveMetricsUseCaseRequest {
  approve_transactions: EventLog[];
}

export class GasApproveMetricsUseCase {
  constructor(private web3Repository: Web3Interface) {}

  async exec({ approve_transactions }: GasApproveMetricsUseCaseRequest) {
    let total = BigInt(0);

    for (var transactionindex in approve_transactions) {
      const transaction = approve_transactions[transactionindex];

      const receipt = await this.web3Repository.getTransactionReceipt(
        transaction.transactionHash
      );
      const transactionFee = BigInt(receipt.gasUsed) * BigInt(receipt.gasPrice);
      total += transactionFee;
      console.log(transaction.transactionHash);
    }

    return total;
  }
}
