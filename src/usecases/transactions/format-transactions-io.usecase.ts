import { Web3Interface } from "../../repository/interfaces/web3.interface";

//TODO corrigir tipagem
interface FormatTransactionsIOUseCaseRequest {
  cost_group:any
}


class FormatTransactionsIOUseCase {
  constructor(private web3Repository:Web3Interface){}

  exec({cost_group}:FormatTransactionsIOUseCaseRequest){
    console.log(cost_group)
  }

}

export {FormatTransactionsIOUseCase};