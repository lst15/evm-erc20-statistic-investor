import { Web3Interface } from "../../repository/interfaces/web3.interface";

interface GasMetricsUseCaseRequest {
  txSeparator: any;
}

export class GasMetricsUseCase {
  constructor(private web3Repository: Web3Interface) {}

  async exec({ txSeparator }: GasMetricsUseCaseRequest) {
    const metriclist: any = [];
    for (var groupIndex in txSeparator) {
      const group = txSeparator[groupIndex];
      metriclist.push([]);

      for (var transactionIndex in group) {
        const transaction = group[transactionIndex];
        const receipt = await this.web3Repository.getTransactionReceipt(
          transaction.transactionHash
        );
        const transactionFee =
          BigInt(receipt.gasUsed) * BigInt(receipt.gasPrice);
        metriclist[groupIndex][transactionIndex] = transactionFee;
      }
    }
    return metriclist;
  }
}
