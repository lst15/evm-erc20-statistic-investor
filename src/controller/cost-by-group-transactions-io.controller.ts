import { CostByGroupTxSplitterFactory } from "../factory/cost-by-group-transactions-io.factory";
import { BuildContractsModel } from "../model/main-contracts.model";
import { TransactionIOModel } from "../model/transactions-io.model";

const CostByGroupTxSplitterController = (
  groups: any[],
  transaction_io: TransactionIOModel,
  main_contract: BuildContractsModel,
  user_address: string
) => {
  const factory = CostByGroupTxSplitterFactory();
  return factory.exec({ groups, transaction_io, main_contract, user_address });
};

export { CostByGroupTxSplitterController };
