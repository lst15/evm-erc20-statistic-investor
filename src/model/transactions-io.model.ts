import { EventLog } from "ethers";

export class TransactionIOModel{
  readonly transactions_in?:EventLog[];
  readonly transactions_out?: EventLog[];
}