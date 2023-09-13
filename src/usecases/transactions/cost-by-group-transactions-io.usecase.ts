import { EventLog } from "ethers";
import { Web3Interface } from "../../repository/interfaces/web3.interface";

//TODO corrigir tipagem do agroupping posteriormente
interface CostByGroupTransactionsIOUseCaseRequest {
  groups:any
}

class CostByGroupTransactionsIOUseCase {
  constructor(private web3Repository:Web3Interface) {}

  async exec({groups}:CostByGroupTransactionsIOUseCaseRequest){

    const cost_groups:any = []

    for(var i in groups){
      const index = parseInt(i);
      cost_groups.push([])

        for(var _ in groups[index]){
          const group = groups[index][_] as EventLog & {operation:string}


          if(group.operation == "buy"){
            cost_groups[index].bought = group.args[2]  
          } else {
            if(!cost_groups[index].total_sell) cost_groups[index].total_sell = group.args[2]
            else cost_groups[index].total_sell += group.args[2];          
          }
          
          const transaction = await this.web3Repository.getTransaction(group.transactionHash)
          const transaction_receipt = await this.web3Repository.getTransactionReceipt(group.transactionHash)

          if(!cost_groups[index].total_cost_transaction) cost_groups[index].total_cost_transaction = transaction.value
          else cost_groups[index].total_cost_transaction += transaction.value;        

          if(!cost_groups[index].total_gasfee) cost_groups[index].total_gasfee = transaction_receipt.gasUsed * transaction_receipt.gasPrice
          else cost_groups[index].total_gasfee += transaction_receipt.gasUsed * transaction_receipt.gasPrice;          

        }

    }
    return cost_groups
  }

}

export {CostByGroupTransactionsIOUseCase}