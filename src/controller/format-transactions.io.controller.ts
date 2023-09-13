import { FormatTransactionsIOFactory } from "../factory/format-transactions-io.factory"

const FormatTransactionsIOController = (cost_group:any) => {
  const factory = FormatTransactionsIOFactory();
  return factory.exec({cost_group});
}

export{FormatTransactionsIOController};