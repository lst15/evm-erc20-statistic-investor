import { EventLog } from "ethers";
import { BuildContractsModel } from "../../model/main-contracts.model";
import { TransactionIOModel } from "../../model/transactions-io.model";
import { Web3Interface } from "../../repository/interfaces/web3.interface";
import { TxSplitterModel } from "../../model/tx-splitter.model";
import { env } from "../../env-schema";

interface TxSplitterUseCaseRequest {
  build_contracts: BuildContractsModel;
  token_pair: string;
  user_address: string[];
}

class TxSplitterUseCase {
  constructor(private web3Repository: Web3Interface) {}

  async exec({
    build_contracts,
    token_pair,
    user_address,
  }: TxSplitterUseCaseRequest): Promise<TxSplitterModel> {
    const transactions: TxSplitterModel = {
      pair: {
        transactions_in: [],
        transactions_out: [],
      },
      contract: {
        transactions_in: [],
        transactions_out: [],
      },
      approves: [],
    };

    for (var index in user_address) {
      const address = user_address[index];

      const approve_filter = build_contracts.token_contract.filters.Approval(
        address,
        null
      );

      const pair_in_filter = build_contracts.weth_contract.filters.Transfer(
        null,
        token_pair
      );
      const pair_out_filter = build_contracts.weth_contract.filters.Transfer(
        token_pair,
        null
      );

      const contract_in_filter =
        build_contracts.token_contract.filters.Transfer(null, address);
      const contract_out_filter =
        build_contracts.token_contract.filters.Transfer(address);

      const pair_transactions_in =
        (await build_contracts.weth_contract.queryFilter(
          pair_in_filter
        )) as EventLog[];

      const pair_transactions_out =
        (await build_contracts.weth_contract.queryFilter(
          pair_out_filter
        )) as EventLog[];

      const contract_transactions_in =
        (await build_contracts.token_contract.queryFilter(
          contract_in_filter
        )) as EventLog[];
      const contract_transactions_out =
        (await build_contracts.token_contract.queryFilter(
          contract_out_filter
        )) as EventLog[];

      const approve_transaction =
        (await build_contracts.token_contract.queryFilter(
          approve_filter
        )) as EventLog[];

      approve_transaction.forEach((log) => {
        transactions.approves.push(log);
      });

      pair_transactions_in.forEach((log) => {
        transactions.pair.transactions_in.push(log);
      });

      pair_transactions_out.forEach((log) => {
        transactions.pair.transactions_out.push(log);
      });

      contract_transactions_in.forEach((log) => {
        transactions.contract.transactions_in.push(log);
      });

      contract_transactions_out.forEach((log) => {
        transactions.contract.transactions_out.push(log);
      });
    }

    return transactions;
  }
}

export { TxSplitterUseCase };
