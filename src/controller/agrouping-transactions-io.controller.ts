import { EventLog } from "ethers";
import { AgroupingTransactionsIOFactory } from "../factory/agrouping-transactions-io.usecase";

const AgroupingTransactionsIOController = (indexing_transaction:(EventLog & {operation:string})[]) => {
  const factory = AgroupingTransactionsIOFactory()
  return factory.exec({indexing_transaction})
}

export {AgroupingTransactionsIOController};