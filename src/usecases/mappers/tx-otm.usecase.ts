import { EventLog } from "ethers";
import { TransactionIOModel } from "../../model/transactions-io.model";
import { Web3Interface } from "../../repository/interfaces/web3.interface";

interface TxOTMUseCaseRequest {
  txSplitter: TransactionIOModel;
}

//TODO corrigir tipagem
class TxOTMUseCase {
  constructor(private web3Repository: Web3Interface) {}

  exec({
    txSplitter,
  }: TxOTMUseCaseRequest): (EventLog & { operation: string })[] {
    const txOtm: any[] = [];

    for (var i in txSplitter.contract_transactions?.contract_transactions_in) {
      const index = parseInt(i);
      const transactionLog =
        txSplitter.contract_transactions?.contract_transactions_in[index];

      txSplitter.pair_transactions?.pair_transactions_in.forEach(
        (transactionIn) => {
          if (transactionIn.transactionHash == transactionLog.transactionHash) {
            txOtm.push({ ...transactionIn, operation: "buy" });
          }
        }
      );
    }

    for (var i in txSplitter.contract_transactions?.contract_transactions_out) {
      const index = parseInt(i);
      const transactionLog =
        txSplitter.contract_transactions?.contract_transactions_out[index];

      txSplitter.pair_transactions?.pair_transactions_out.forEach(
        (transactionOut) => {
          if (
            transactionOut.transactionHash == transactionLog.transactionHash
          ) {
            //console.log(transactionLog.transactionHash)
            txOtm.push({ ...transactionOut, operation: "sell" });
          }
        }
      );
    }

    txOtm.sort((a: any, b: any) => a.blockNumber - b.blockNumber);

    const seenKeys: any = {};
    const filteredArray = txOtm.filter((obj) => {
      if (!seenKeys.hasOwnProperty(obj.transactionHash)) {
        seenKeys[obj.transactionHash] = true;
        return true;
      }
      return false;
    });

    return filteredArray as (EventLog & { operation: string })[];
  }
}

export { TxOTMUseCase };
