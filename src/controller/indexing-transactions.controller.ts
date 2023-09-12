import { IndexingTransactionsFactory } from "../factory/indexing-transactions.factory";
import { TransactionIOModel } from "../model/transactions-io.model";

const IndexingTransactionsController = (transactions_io:TransactionIOModel) => {
  const factory = IndexingTransactionsFactory()
  return factory.exec({transactions_io})
}

export {IndexingTransactionsController};