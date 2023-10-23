import { EventLog } from "ethers";

export class TxSplitterModel {
  public pair!: {
    transactions_in: EventLog[];
    transactions_out: EventLog[];
  };
  public contract!: {
    transactions_in: EventLog[];
    transactions_out: EventLog[];
  };
  public approves!: EventLog[];
}
