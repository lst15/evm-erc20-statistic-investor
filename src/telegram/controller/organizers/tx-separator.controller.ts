import { EventLog } from "ethers";
import { TxSeparatorFactory } from "../../../factory/organizers/tx-separator.factory";

const TxSeparatorController = (txOtm: (EventLog & { operation: string })[]) => {
  const factory = TxSeparatorFactory();
  return factory.exec({ txOtm });
};

export { TxSeparatorController };
