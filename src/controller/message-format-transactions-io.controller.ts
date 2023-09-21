import { MessageFormatTxSplitterFactory } from "../factory/message-format-transactions-io.factory";
import { TxTracerModel } from "../model/internal-transactios.model";
import { GetTokenInfoModel } from "../model/token-info.model";
import { TransactionIOModel } from "../model/transactions-io.model";

const MessageFormatTxSplitterController = (
  getTokenInfo: GetTokenInfoModel,
  formated_transactions_group: any[],
  contract_address: string
) => {
  const factory = MessageFormatTxSplitterFactory();
  return factory.exec({
    getTokenInfo,
    formated_transactions_group,
    contract_address,
  });
};

export { MessageFormatTxSplitterController };
