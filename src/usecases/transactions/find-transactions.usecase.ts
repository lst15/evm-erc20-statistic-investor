import { TransactionIOModel } from "../../model/transactions-io.model";
import { Web3Interface } from "../../repository/interfaces/web3.interface";

interface FindTransactionsUseCaseRequest{
  transactions_io:TransactionIOModel
}

class FindTransactionsUseCase {
  constructor(private web3Repository:Web3Interface){}

  async exec({transactions_io}:FindTransactionsUseCaseRequest){
    
  }

}