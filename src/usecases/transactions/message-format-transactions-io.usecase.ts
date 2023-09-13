import { env } from "../../env-schema";
import { TokenInfoModel } from "../../model/token-info.model";
import { TransactionIOModel } from "../../model/transactions-io.model";
import { Web3Interface } from "../../repository/interfaces/web3.interface";

interface MessageFormatTransactionsIOUseCaseRequest {
  token_info:TokenInfoModel
  formated_transactions_group:any[]
}

class MessageFormatTransactionsIOUseCase {
  constructor(private web3Repository:Web3Interface){}

  async exec({token_info,formated_transactions_group}:MessageFormatTransactionsIOUseCaseRequest){
    //let message = `${token_info.name}\n\n`
    let message = ``
    
    formated_transactions_group.forEach(cost_group => {
      const bought = parseFloat(cost_group.bought.eth).toFixed(3)
      const approve = parseFloat(cost_group.approve.eth).toFixed(3)
      const txgas = parseFloat(cost_group.total_gasfee.eth).toFixed(3)
      const total_spent = (Number(cost_group.bought.eth) + Number(cost_group.total_gasfee.eth) + Number(cost_group.total_cost_transaction.eth) + Number(cost_group.approve.eth)).toString()
      const total_investiment = parseFloat(total_spent).toFixed(3)
      

      message += `Token Investiment: ${bought}\n`  
      message += `Approve: ${approve}\n`
      message += `Bribe: \n`
      message += `TxGas: ${txgas}\n\n`
      
      message += `Total investiment: ${total_investiment}\n`
      if(cost_group.total_sell.eth){
        const profit = (Number(cost_group.total_sell.eth) - Number(total_spent)).toString()
        const format_profit = parseFloat(profit).toFixed(3)
        message += `Profit: ${format_profit}\n\n`
        
      }      
      //message += `Buy: ${env.BLOCKSCAN}${cost_group.bought.hash}\n`

      // if(cost_group.total_sell.hash) {
      //   //message += `Sell: ${env.BLOCKSCAN}${cost_group.total_sell.hash}\n\n`;
      // } else {
      //   //message += `\n`;
      // }          
      // message += `Token Investiment: ${cost_group.bought.eth}\n`      
      // //message += `Internal spent: ${cost_group.total_cost_transaction.eth}\n`      
      // const total_spent = Number(cost_group.bought.eth) + Number(cost_group.total_gasfee.eth) + Number(cost_group.total_cost_transaction.eth) + Number(cost_group.approve.eth)
      // message += `Total investiment: ${total_spent}\n`
      // message += `Approve: ${cost_group.approve.eth}\n`
      // message += `TxGas: ${cost_group.total_gasfee.eth}\n\n`
      
      // if(cost_group.total_sell.eth){
      //   //message += `Brute Profit: ${cost_group.total_sell.eth - cost_group.bought.eth}\n`        
      //   message += `Profit: ${cost_group.total_sell.eth - total_spent}\n\n`
        
      // }
      

    });

    return message;
  }

}

export {MessageFormatTransactionsIOUseCase}