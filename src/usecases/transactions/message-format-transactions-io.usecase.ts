import { TokenInfoModel } from "../../model/token-info.model";
import { Web3Interface } from "../../repository/interfaces/web3.interface";

interface MessageFormatTransactionsIOUseCaseRequest {
  token_info:TokenInfoModel
  formated_transactions_group:any[]
}

class MessageFormatTransactionsIOUseCase {
  constructor(private web3Repository:Web3Interface){}

  exec({token_info,formated_transactions_group}:MessageFormatTransactionsIOUseCaseRequest){
    console.log(token_info)
  }

}

export {MessageFormatTransactionsIOUseCase}