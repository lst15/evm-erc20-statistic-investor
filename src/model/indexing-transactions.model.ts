import { EventLog, Log } from "ethers";


//TODO corrigir tipagem
export class IndexingTransactionsModel {
  readonly indexing_transaction?:(EventLog & {operation:string})
}