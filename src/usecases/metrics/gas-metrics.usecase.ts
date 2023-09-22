import { Web3Interface } from "../../repository/interfaces/web3.interface";

interface GasMetricsUseCaseRequest {
  txSeparator: any;
}

export class GasMetricsUseCase {
  constructor(private web3Repository: Web3Interface) {}

  async exec({ txSeparator }: GasMetricsUseCaseRequest) {
    for (var groupIndex in txSeparator) {
      const group = txSeparator[groupIndex];

      for (var transactionIndex in group) {
        const transaction = group[transactionIndex];

        console.log(transaction);
      }
    }
  }
}
