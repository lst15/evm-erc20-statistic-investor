import { env } from "../../env-schema";
import { InternalTransactionsModel } from "../../model/internal-transactios.model";
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
    let message = `${token_info.name}\n\n`
    //let message = ``
    
    formated_transactions_group.forEach(cost_group => {
      const bought = parseFloat(cost_group.bought.eth).toFixed(3)
      const approve = parseFloat(cost_group.approve.eth).toFixed(3)
      const txgas = parseFloat(cost_group.total_gasfee.eth).toFixed(3)
      
      const total_spent = (Number(cost_group.bought.eth) + Number(cost_group.total_gasfee.eth) + Number(cost_group.total_cost_transaction.eth) + Number(cost_group.approve.eth)).toString()
      const total_investiment = parseFloat(total_spent).toFixed(3)
     
      message += `Buy: ${env.BLOCKSCAN}${cost_group.bought.hash}\n`

      if(cost_group.total_sell.hash) {
        message += `Sell: ${env.BLOCKSCAN}${cost_group.total_sell.hash}\n\n`;
      } else {
        message += `\n`;
      }        

      message += `Token Investiment: ${bought}\n`  
      message += `Approve: ${approve}\n`
      message += `Bribe: ${cost_group.bribe.eth}\n`
      message += `TxGas: ${txgas}\n\n`
      
      message += `Total investiment: ${total_investiment}\n`
      if(cost_group.total_sell.eth){
        const profit = (Number(cost_group.total_sell.eth) - Number(total_spent)).toString()
        const format_profit = parseFloat(profit).toFixed(3)
        message += `Profit: ${format_profit}\n\n`
        
      }

    });

    return message;
  }

}

export {MessageFormatTransactionsIOUseCase}