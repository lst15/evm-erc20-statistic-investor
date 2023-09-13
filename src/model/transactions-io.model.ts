import { EventLog } from "ethers";

export class TransactionIOModel{

  readonly pair_transactions?:{
    readonly pair_transactions_in:EventLog[];
    readonly pair_transactions_out:EventLog[];
  }
  
  readonly contract_transactions?:{
    readonly contract_transactions_in:EventLog[];
    readonly contract_transactions_out:EventLog[];
  }

  readonly approve_transaction?:EventLog[]

}