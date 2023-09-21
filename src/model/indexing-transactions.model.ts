import { EventLog, Log } from "ethers";

//TODO corrigir tipagem
export class txOTMModel {
  readonly txOtm?: EventLog & { operation: string };
}
