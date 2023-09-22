import { EventLog } from "ethers";
import { BuildContractsModel } from "../../model/main-contracts.model";
import { TransactionIOModel } from "../../model/transactions-io.model";
import { Web3Interface } from "../../repository/interfaces/web3.interface";

interface TxSplitterUseCaseRequest {
  build_contracts: BuildContractsModel;
  token_pair: string;
  user_address: string;
}

class TxSplitterUseCase {
  constructor(private web3Repository: Web3Interface) {}

  async exec({
    build_contracts,
    token_pair,
    user_address,
  }: TxSplitterUseCaseRequest): Promise<TransactionIOModel> {
    const approve_filter =
      build_contracts.token_contract.filters.Approval(user_address);

    const pair_in_filter = build_contracts.weth_contract.filters.Transfer(
      null,
      token_pair
    );
    const pair_out_filter = build_contracts.weth_contract.filters.Transfer(
      token_pair,
      null
    );

    const contract_in_filter = build_contracts.token_contract.filters.Transfer(
      null,
      user_address
    );
    const contract_out_filter =
      build_contracts.token_contract.filters.Transfer(user_address);
    console;
    try {
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

      return {
        pair_transactions: { pair_transactions_in, pair_transactions_out },
        contract_transactions: {
          contract_transactions_in,
          contract_transactions_out,
        },
        approve_transaction,
      };
    } catch (error: any) {
      return error;
    }
  }
}

export { TxSplitterUseCase };