import { MessageFormatTransactionsIOFactory } from "../factory/message-format-transactions-io.factory";
import { InternalTransactionsModel } from "../model/internal-transactios.model";
import { TokenInfoModel } from "../model/token-info.model";
import { TransactionIOModel } from "../model/transactions-io.model";

const MessageFormatTransactionsIOController = (token_info:TokenInfoModel,formated_transactions_group:any[]) => {
  const factory = MessageFormatTransactionsIOFactory()
  return factory.exec({token_info,formated_transactions_group});
}

export {MessageFormatTransactionsIOController};