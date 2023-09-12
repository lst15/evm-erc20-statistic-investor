import { TransactionsIOFactory } from "../factory/transactions-io.factory";
import { MainContractsModel } from "../model/main-contracts.model";

const TransactionsIOController = (
  main_contracts:MainContractsModel,
  token_pair:string,
  user_address:string
) => {
  const factory = TransactionsIOFactory()
  return factory.exec({main_contracts,token_pair,user_address})
}

export {TransactionsIOController};