import { EventLog, ethers } from "ethers";
import { Web3Interface } from "../../repository/interfaces/web3.interface";
import { InternalTransactionsModel } from "../../model/internal-transactios.model";
import { InternalTransactionsUseCase } from "./internal-transactions.usecase";
import { RequestsInterface } from "../../repository/interfaces/requests.interface";
import { InternalCostTransactionsUseCase } from "./internal-cost-transactions.usecase";
import { env } from "../../env-schema";

//TODO corrigir tipagem do agroupping posteriormente
interface CostByGroupTransactionsIOUseCaseRequest {
  groups:any
}

class CostByGroupTransactionsIOUseCase {
  constructor(
    private web3Repository:Web3Interface,
    private requestsRepository:RequestsInterface
  ) {}

  async exec({groups}:CostByGroupTransactionsIOUseCaseRequest){

    const cost_groups:any = []
    
    for(var i in groups){
      const index = parseInt(i);
      cost_groups.push([])

        for(var _ in groups[index]){
          const group = groups[index][_] as EventLog & {operation:string}

          const internal_transactions = await (new InternalTransactionsUseCase(this.requestsRepository)).exec({transactionHash:group.transactionHash})
          const internal_cost_group = new InternalCostTransactionsUseCase(this.web3Repository).exec({internal_transactions});
          
          if(group.operation == "buy"){
            cost_groups[index].bought = group.args[2]
            cost_groups[index].bought_hash = group.transactionHash
            
            cost_groups[index].bribe = internal_transactions[0].to != env.WETH ? Number(internal_transactions[0].value) : 0
            cost_groups[index].total_cost_transaction = ethers.parseEther('0') - internal_cost_group.received
          } else {

            cost_groups[index].sell_hash = group.transactionHash

            if(!cost_groups[index].total_sell) cost_groups[index].total_sell = internal_cost_group.selling
            else cost_groups[index].total_sell += internal_cost_group.selling
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