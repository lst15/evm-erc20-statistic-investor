import { Transaction, ethers } from "ethers";
import { TransactionIOModel } from "../../model/transactions-io.model";
import { Web3Interface } from "../../repository/interfaces/web3.interface";
import { BuildContractsModel } from "../../model/main-contracts.model";

//TODO corrigir tipagem
interface FormatTxSplitterUseCaseRequest {
  cost_group: any[];
  txSplitter: TransactionIOModel;
  contract_address: string;
}

class FormatTxSplitterUseCase {
  constructor(private web3Repository: Web3Interface) {}

  async exec({
    cost_group,
    txSplitter,
    contract_address,
  }: FormatTxSplitterUseCaseRequest) {
    const formated: any = [];
    let approve_totalgas = ethers.parseEther("0");

    for (var i in txSplitter.approve_transaction) {
      const index = parseInt(i);
      const transaction = txSplitter.approve_transaction[index];
      const approve_receipt = await this.web3Repository.getTransactionReceipt(
        transaction.transactionHash
      );

      if (approve_receipt.to.toLowerCase() == contract_address.toLowerCase()) {
        approve_totalgas += (approve_receipt.gasUsed *
          approve_receipt.gasPrice) as any;
      }
    }

    cost_group.forEach((group) => {
      formated.push({
        bought: {
          eth: this.web3Repository.formatEther(group.bought),
          wei: group.bought,
          hash: group.bought_hash,
        },

        total_cost_transaction: {
          eth: this.web3Repository.formatEther(group.total_cost_transaction),
          wei: group.total_cost_transaction,
        },

        total_gasfee: {
          eth: this.web3Repository.formatEther(group.total_gasfee),
          wei: group.total_gasfee,
        },

        total_sell: {
          eth: group.total_sell
            ? this.web3Repository.formatEther(group.total_sell)
            : group.total_sell,
          wei: group.total_sell,
          hash: group.sell_hash,
        },

        approve: {
          eth: this.web3Repository.formatEther(approve_totalgas),
          wei: approve_totalgas,
        },

        bribe: {
          eth: group.bribe,
        },

        tokens_sell: {
          wei: group.tokens_sell,
        },
      });
    });

    return formated;
  }
}

export { FormatTxSplitterUseCase };
