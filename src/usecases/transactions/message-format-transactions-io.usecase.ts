import { env } from "../../env-schema";
import { InternalTransactionsModel } from "../../model/internal-transactios.model";
import { TokenInfoModel } from "../../model/token-info.model";
import { TransactionIOModel } from "../../model/transactions-io.model";
import { Web3Interface } from "../../repository/interfaces/web3.interface";
import { LocatePersonalUnitUtils } from "../../utils/locate-personal-unit.utils";

interface MessageFormatTransactionsIOUseCaseRequest {
  token_info: TokenInfoModel;
  formated_transactions_group: any[];
  contract_address: string;
}

class MessageFormatTransactionsIOUseCase {
  constructor(private web5Repository: Web3Interface) {}

  async exec({
    token_info,
    formated_transactions_group,
    contract_address,
  }: MessageFormatTransactionsIOUseCaseRequest) {
    let message = `${token_info.name}\n`;
    message += `${contract_address}\n\n`;
    let total_all_cost = 0;
    let total_all_profit = 0;

    formated_transactions_group.forEach((cost_group) => {
      const bought = parseFloat(cost_group.bought.eth).toFixed(5);
      const approve = parseFloat(cost_group.approve.eth).toFixed(5);
      const txgas = parseFloat(cost_group.total_gasfee.eth).toFixed(5);

      const total_spent =
        Number(cost_group.total_gasfee.eth) +
        Number(cost_group.total_cost_transaction.eth) +
        Number(cost_group.approve.eth);
      const total_investiment = parseFloat(total_spent.toString()).toFixed(5);

      message += `Buy: ${env.BLOCKSCAN}${cost_group.bought.hash}\n`;

      if (cost_group.total_sell.hash) {
        message += `Sell: ${env.BLOCKSCAN}${cost_group.total_sell.hash}\n\n`;
      } else {
        message += `\n`;
      }

      message += `Token Investiment: ${bought}\n`;
      message += `Approve: ${approve}\n`;
      message += `Bribe: ${cost_group.bribe.eth}\n`;
      message += `TxGas: ${txgas}\n\n`;

      message += `Total investiment: ${total_investiment}\n`;
      if (cost_group.total_sell.eth) {
        const profit = Number(cost_group.total_sell.eth) - Number(total_spent);
        const tokens_selled = LocatePersonalUnitUtils(
          cost_group.tokens_sell.wei,
          token_info.decimals as number
        );
        const eth_selled = parseFloat(cost_group.total_sell.eth).toFixed(5);
        message += `Token Sell: ${eth_selled}\n`;
        const format_profit = parseFloat(profit.toString()).toFixed(5);
        message += `Profit: ${format_profit}\n\n`;
        total_all_profit += profit;
      } else {
        message += `\n`;
      }
      total_all_cost += total_spent;
    });
    const format_total_all_investment = parseFloat(
      total_all_cost.toString()
    ).toFixed(5);
    const format_total_all_profit = parseFloat(
      total_all_profit.toString()
    ).toFixed(5);

    message += `Total all investment: ${format_total_all_investment}\n`;
    message += `Total all profit: ${format_total_all_profit}`;

    return message;
  }
}

export { MessageFormatTransactionsIOUseCase };
