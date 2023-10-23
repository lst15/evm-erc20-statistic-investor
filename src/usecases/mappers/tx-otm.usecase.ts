import { EventLog } from "ethers";
import { TransactionIOModel } from "../../model/transactions-io.model";
import { Web3Interface } from "../../repository/interfaces/web3.interface";
import { TxSplitterModel } from "../../model/tx-splitter.model";
import { TxOtmModel } from "../../model/tx-otm.model";

interface TxOTMUseCaseRequest {
  txSplitter: TxSplitterModel;
}

//TODO corrigir tipagem
class TxOTMUseCase {
  constructor(private web3Repository: Web3Interface) {}

  exec({
    txSplitter,
  }: TxOTMUseCaseRequest): (EventLog & { operation: string })[] {
    const txOtm: TxOtmModel = {
      events: [],
    };
    for (var i in txSplitter.contract?.transactions_in) {
      const index = parseInt(i);
      const transactionLog = txSplitter.contract?.transactions_in[index];

      txSplitter.pair?.transactions_in.forEach((transactionIn) => {
        if (transactionIn.transactionHash == transactionLog.transactionHash) {
          const transaction: EventLog & { operation: string } = {
            ...transactionIn,
            eventName: transactionIn.eventName,
            eventSignature: transactionIn.eventSignature,
            toJSON: transactionIn.toJSON,
            getBlock: transactionIn.getBlock,
            getTransaction: transactionIn.getTransaction,
            getTransactionReceipt: transactionIn.getTransactionReceipt,
            removedEvent: transactionIn.removedEvent,
            operation: "buy",
          };
          txOtm.events.push(transaction);
        }
      });
    }

    for (var i in txSplitter.contract?.transactions_out) {
      const index = parseInt(i);
      const transactionLog = txSplitter.contract?.transactions_out[index];

      txSplitter.pair?.transactions_out.forEach((transactionOut) => {
        if (transactionOut.transactionHash == transactionLog.transactionHash) {
          const transaction: EventLog & { operation: string } = {
            ...transactionOut,
            eventName: transactionOut.eventName,
            eventSignature: transactionOut.eventSignature,
            toJSON: transactionOut.toJSON,
            getBlock: transactionOut.getBlock,
            getTransaction: transactionOut.getTransaction,
            getTransactionReceipt: transactionOut.getTransactionReceipt,
            removedEvent: transactionOut.removedEvent,
            operation: "sell",
          };
          txOtm.events.push(transaction);
        }
      });
    }

    txOtm.events.sort((a: any, b: any) => a.blockNumber - b.blockNumber);

    const seenKeys: any = {};
    const filteredArray = txOtm.events.filter((obj) => {
      if (!seenKeys.hasOwnProperty(obj.transactionHash)) {
        seenKeys[obj.transactionHash] = true;
        return true;
      }
      return false;
    });

    return filteredArray;
  }
}

export { TxOTMUseCase };
