import { ethers } from "ethers";
import { env } from "../../env-schema";
import { InternalTransactionsModel } from "../../model/internal-transactios.model";
import { Web3Interface } from "../../repository/interfaces/web3.interface";

interface InternalCostTransactionsUseCaseRequest {
  internal_transactions: InternalTransactionsModel[];
  user_address: string;
}

class InternalCostTransactionsUseCase {
  constructor(private web3Repository: Web3Interface) {}

  exec({
    internal_transactions,
    user_address,
  }: InternalCostTransactionsUseCaseRequest) {
    const info_internal_cost = {
      received: ethers.parseEther("0"),
      paid: ethers.parseEther("0"),
      unknow: ethers.parseEther("0"),
      selling: ethers.parseEther("0"),
    };

    internal_transactions.forEach((internal_transaction) => {
      if (!internal_transaction.value) return;

      if (internal_transaction.to == user_address) {
        info_internal_cost.received += ethers.parseEther(
          internal_transaction.value
        );
      }

      if (
        internal_transaction.from == env.ROUTER &&
        internal_transaction.to == user_address
      ) {
        info_internal_cost.selling += ethers.parseEther(
          internal_transaction.value
        );
      }
    });

    return info_internal_cost;
  }
}

export { InternalCostTransactionsUseCase };
