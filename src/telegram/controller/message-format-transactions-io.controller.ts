import { MessageFormatTxSplitterFactory } from "../../factory/message-format-transactions-io.factory";
import { GetTokenInfoModel } from "../../model/token-info.model";

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
