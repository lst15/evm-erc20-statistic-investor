import { EventLog } from "ethers";
import { Web3Interface } from "../../repository/interfaces/web3.interface";

//TODO corrigir tipagem da indexação
interface AgroupingTransactionsIOUseCaseRequest {
  indexing_transaction:(EventLog & {operation:string})[],  
}

class AgroupingTransactionsIOUseCase {
  constructor(private web3Repository:Web3Interface){}

  exec({indexing_transaction}:AgroupingTransactionsIOUseCaseRequest){
    let group_index = 0;
    const groups:any = []

    indexing_transaction.forEach((transaction: (EventLog & {operation:string})) => {
      groups[group_index].push(transaction)

      if(transaction.operation == "sell"){
        group_index += 1;
      }

    });

  }

}

export {AgroupingTransactionsIOUseCase};