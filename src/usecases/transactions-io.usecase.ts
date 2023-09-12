import { MainContractsModel } from "../model/main-contracts.model";
import { TransactionIOModel } from "../model/transactions-io.model";
import { Web3Interface } from "../repository/interfaces/web3.interface";

interface TransactionsIOUseCaseRequest {
  main_contracts:MainContractsModel,
  token_pair:string  
}

class TransactionsIOUseCase{
  constructor(private web3Repository:Web3Interface){}

  async exec({main_contracts,token_pair}:TransactionsIOUseCaseRequest){

    const in_filter = main_contracts.factory_contract.filters.Transfer(token_pair)
    const out_filter = main_contracts.factory_contract.filters.Transfer(null,token_pair)

    const transactions_in = await main_contracts.weth_contract.queryFilter(in_filter)
    const transactions_out = await main_contracts.weth_contract.queryFilter(out_filter)

    return {transactions_in,transactions_out}
  }

}

export {TransactionsIOUseCase}