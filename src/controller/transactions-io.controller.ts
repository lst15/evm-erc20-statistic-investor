import { TransactionsIOFactory } from "../factory/transactions-io.factory";
import { MainContractsModel } from "../model/main-contracts.model";

const TransactionsIOController = async (
  main_contracts:MainContractsModel,
  token_pair:string,
  user_address:string,
) => {
  const factory = TransactionsIOFactory()
  const execute = await factory.exec({main_contracts,token_pair,user_address})
  
  if(execute instanceof Error){
    //const code = (execute as any).error.code
    return false;
  }

  return execute;
}

export {TransactionsIOController};