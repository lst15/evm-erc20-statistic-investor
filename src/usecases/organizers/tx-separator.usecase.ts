import { EventLog } from "ethers";
import { Web3Interface } from "../../../repository/interfaces/web3.interface";

//TODO corrigir tipagem da indexação
interface TxSeparatorUseCaseRequest {
  txOtm: (EventLog & { operation: string })[];
}

class TxSeparatorUseCase {
  constructor(private web3Repository: Web3Interface) {}

  exec({ txOtm }: TxSeparatorUseCaseRequest) {
    let group_index = -1;
    const groups: any = [];

    txOtm.forEach((transaction: EventLog & { operation: string }) => {
      if (transaction.operation == "buy") {
        group_index = group_index += 1;
        groups.push([]);
      }
      groups[group_index].push(transaction);
    });

    return groups;
  }
}

export { TxSeparatorUseCase };
