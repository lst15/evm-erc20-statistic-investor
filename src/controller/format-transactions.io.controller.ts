import { FormatTransactionsIOFactory } from "../factory/format-transactions-io.factory"
import { TransactionIOModel } from "../model/transactions-io.model";

const FormatTransactionsIOController = (cost_group:any,transactions_io:TransactionIOModel,contract_address:string) => {
  const factory = FormatTransactionsIOFactory();
  return factory.exec({cost_group,transactions_io,contract_address});
}

export{FormatTransactionsIOController};