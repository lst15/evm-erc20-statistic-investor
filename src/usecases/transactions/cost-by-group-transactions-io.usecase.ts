import { EventLog, ethers } from "ethers";
import { Web3Interface } from "../../repository/interfaces/web3.interface";
import { TxTracerModel } from "../../model/internal-transactios.model";
import { TxTracerUseCase } from "../readers/tx-tracer.usecase";
import { RequestsInterface } from "../../repository/interfaces/requests.interface";
import { InternalCostTransactionsUseCase } from "./internal-cost-transactions.usecase";
import { env } from "../../env-schema";
import { TransactionIOModel } from "../../model/transactions-io.model";
import { BuildContractsModel } from "../../model/main-contracts.model";

//TODO corrigir tipagem do agroupping posteriormente
interface CostByGroupTxSplitterUseCaseRequest {
  groups: any;
  transaction_io: TransactionIOModel;
  main_contract: BuildContractsModel;
  user_address: string;
}

class CostByGroupTxSplitterUseCase {
  constructor(
    private web3Repository: Web3Interface,
    private requestsRepository: RequestsInterface
  ) {}

  async exec({
    groups,
    transaction_io,
    main_contract,
    user_address,
  }: CostByGroupTxSplitterUseCaseRequest) {
    const cost_groups: any = [];
    const tokens_selled_by_group: any = [];
    let total_bought = BigInt(0);
    let total_all_cost = BigInt(0);
    let total_all_profit = BigInt(0);
    let total_all_sell = BigInt(0);

    for (var i in groups) {
      const index = parseInt(i);
      cost_groups.push([]);
      tokens_selled_by_group.push(BigInt(0));
      //tokens_bought_by_group.push(BigInt(0));

      for (var _ in groups[index]) {
        const group = groups[index][_] as EventLog & { operation: string };

        const internal_transactions = await new TxTracerUseCase(
          this.requestsRepository
        ).exec({ transactionHash: group.transactionHash });
        const internal_cost_group = new InternalCostTransactionsUseCase(
          this.web3Repository
        ).exec({ user_address, internal_transactions });

        if (group.operation == "buy") {
          cost_groups[index].bought = group.args[2];
          cost_groups[index].bought_hash = group.transactionHash;

          cost_groups[index].bribe =
            internal_transactions[0].to != env.WETH
              ? Number(internal_transactions[0].value)
              : 0;
          cost_groups[index].total_cost_transaction =
            ethers.parseEther("0") - internal_cost_group.received;

          const tokens_sell_transaction =
            transaction_io.contract_transactions?.contract_transactions_in.filter(
              (transaction) =>
                transaction.transactionHash == group.transactionHash
            ) as EventLog[];

          total_bought = tokens_sell_transaction[0].args[2] + total_bought;
        } else {
          cost_groups[index].sell_hash = group.transactionHash;

          if (!cost_groups[index].total_sell)
            cost_groups[index].total_sell = internal_cost_group.selling;
          else cost_groups[index].total_sell += internal_cost_group.selling;

          const current_tokens = await main_contract.token_contract.balanceOf(
            user_address,
            { blockTag: group.blockNumber }
          );
          total_bought -= current_tokens;
          tokens_selled_by_group[index] += total_bought;
          cost_groups[index].tokens_sell = tokens_selled_by_group[index];
        }

        const transaction = await this.web3Repository.getTransaction(
          group.transactionHash
        );
        const transaction_receipt =
          await this.web3Repository.getTransactionReceipt(
            group.transactionHash
          );

        if (!cost_groups[index].total_cost_transaction)
          cost_groups[index].total_cost_transaction = transaction.value;
        else cost_groups[index].total_cost_transaction += transaction.value;

        if (!cost_groups[index].total_gasfee)
          cost_groups[index].total_gasfee =
            transaction_receipt.gasUsed * transaction_receipt.gasPrice;
        else
          cost_groups[index].total_gasfee +=
            transaction_receipt.gasUsed * transaction_receipt.gasPrice;
      }
    }

    return cost_groups;
  }
}

export { CostByGroupTxSplitterUseCase };
