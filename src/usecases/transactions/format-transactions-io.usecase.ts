import { TransactionIOModel } from "../../model/transactions-io.model";
import { Web3Interface } from "../../repository/interfaces/web3.interface";

//TODO corrigir tipagem
interface FormatTransactionsIOUseCaseRequest {
  cost_group:any[],
  transactions_io:TransactionIOModel
}


class FormatTransactionsIOUseCase {
  constructor(private web3Repository:Web3Interface){}

  async exec({cost_group,transactions_io}:FormatTransactionsIOUseCaseRequest){
    const formated:any = []

    const approveHash = (transactions_io.approve_transaction as any)[0].transactionHash    
    const approve_receipt = await this.web3Repository.getTransactionReceipt(approveHash)

    cost_group.forEach(group => {
      
      formated.push({
        
        bought:{
          eth:this.web3Repository.formatEther(group.bought),
          wei:group.bought,
          hash:group.bought_hash
        },
        
        total_cost_transaction:{
          eth:this.web3Repository.formatEther(group.total_cost_transaction),
          wei:group.total_cost_transaction
        },

        total_gasfee:{
          eth:this.web3Repository.formatEther(group.total_gasfee),
          wei:group.total_gasfee          
        },
        
        total_sell:{
          eth:group.total_sell ? this.web3Repository.formatEther(group.total_sell) : group.total_sell,
          wei:group.total_sell,
          hash:group.sell_hash         
        },

        approve:{
          eth:this.web3Repository.formatEther(approve_receipt.gasUsed * approve_receipt.gasPrice ),
          wei:approve_receipt.gasUsed * approve_receipt.gasPrice
        },

        bribe:{
          eth:group.bribe
        }

      })
    });

    return formated
  } 

}

export {FormatTransactionsIOUseCase};