import { CostByGroupTransactionsIOFactory } from "../factory/cost-by-group-transactions-io.factory"
import { MainContractsModel } from "../model/main-contracts.model";
import { TransactionIOModel } from "../model/transactions-io.model";

const CostByGroupTransactionsIoController = (groups:any[],transaction_io:TransactionIOModel,main_contract:MainContractsModel) => {
  const factory = CostByGroupTransactionsIOFactory()
  return factory.exec({groups,transaction_io,main_contract})
}

export {CostByGroupTransactionsIoController};