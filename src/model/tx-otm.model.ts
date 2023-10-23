import { EventLog } from "ethers";

export class TxOtmModel {
  public events!: (EventLog & { operation: string })[];
}
