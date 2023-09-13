import { Transaction, ethers } from "ethers";
import { TransactionIOModel } from "../../model/transactions-io.model";
import { Web3Interface } from "../../repository/interfaces/web3.interface";
import { MainContractsModel } from "../../model/main-contracts.model";

//TODO corrigir tipagem
interface FormatTransactionsIOUseCaseRequest {
  cost_group:any[],
  transactions_io:TransactionIOModel,
  contract_address:string,  
}


class FormatTransactionsIOUseCase {
  constructor(private web3Repository:Web3Interface){}

  async exec({cost_group,transactions_io,contract_address}:FormatTransactionsIOUseCaseRequest){
    const formated:any = []
    let approve_totalgas = ethers.parseEther('0');

    for(var i in transactions_io.approve_transaction){
      const index = parseInt(i);
      const transaction = transactions_io.approve_transaction[index]
      const approve_receipt = await this.web3Repository.getTransactionReceipt(transaction.transactionHash)        
        
      if(approve_receipt.to.toLowerCase() == contract_address) {
        approve_totalgas += (approve_receipt.gasUsed * approve_receipt.gasPrice) as any
      }
        
    }        

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
          eth:this.web3Repository.formatEther(approve_totalgas ),
          wei:approve_totalgas
        },

        bribe:{
          eth:group.bribe
        },

        tokens_sell:{
          wei:group.tokens_sell
        }

      })
    });

    return formated
  } 

}

export {FormatTransactionsIOUseCase};