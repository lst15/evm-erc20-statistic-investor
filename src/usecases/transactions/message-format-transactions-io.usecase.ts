import { env } from "../../env-schema";
import { InternalTransactionsModel } from "../../model/internal-transactios.model";
import { TokenInfoModel } from "../../model/token-info.model";
import { TransactionIOModel } from "../../model/transactions-io.model";
import { Web3Interface } from "../../repository/interfaces/web3.interface";
import { LocatePersonalUnitUtils } from "../../utils/locate-personal-unit.utils";

interface MessageFormatTransactionsIOUseCaseRequest {
  token_info:TokenInfoModel
  formated_transactions_group:any[],
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
      
      const total_spent = ( Number(cost_group.total_gasfee.eth) + Number(cost_group.total_cost_transaction.eth) + Number(cost_group.approve.eth)).toString()
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
        const tokens_selled = LocatePersonalUnitUtils(cost_group.tokens_sell.wei,token_info.decimals as number)
        const eth_selled = parseFloat(cost_group.total_sell.eth).toFixed(3)
        message += `Token Sell: ${eth_selled}\n`
        const format_profit = parseFloat(profit).toFixed(3)
        message += `Profit: ${format_profit}\n\n`
        
      } else {
        message += `\n`
      }

    });

    return message;
  }

}

export {MessageFormatTransactionsIOUseCase}