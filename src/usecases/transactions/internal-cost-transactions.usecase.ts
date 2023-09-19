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
      const to = internal_transaction.to?.toLowerCase();
      const from = internal_transaction.from?.toLowerCase();

      if (!internal_transaction.value) return;

      if (internal_transaction.to?.toLowerCase() == user_address) {
        info_internal_cost.received += ethers.parseEther(
          internal_transaction.value
        );
      }

      if (
        from == env.ROUTER.toLowerCase() &&
        to == user_address.toLowerCase()
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
