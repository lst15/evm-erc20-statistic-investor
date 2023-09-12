import { EventLog } from "ethers";
import { Web3Interface } from "../../repository/interfaces/web3.interface";

//TODO corrigir tipagem do agroupping posteriormente
interface CostByGroupTransactionsIOUseCaseRequest {
  groups:any[]
}

class CostByGroupTransactionsIOUseCase {
  constructor(private web3Repository:Web3Interface) {}

  async exec({groups}:CostByGroupTransactionsIOUseCaseRequest){
    groups.forEach((group:(EventLog & {operation:string})[]) => {
      console.log(group)
    });
  }

}

export {CostByGroupTransactionsIOUseCase}