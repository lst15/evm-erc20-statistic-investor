import { InternalTransactionsFactory } from "../factory/internal-transactions.factory"

const InternalTransactionsController = (transactionHash:string) => {
  const factory = InternalTransactionsFactory()
  return factory.exec({transactionHash});
}

export {InternalTransactionsController};