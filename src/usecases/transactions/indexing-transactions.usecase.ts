import { EventLog } from "ethers";
import { TransactionIOModel } from "../../model/transactions-io.model";
import { Web3Interface } from "../../repository/interfaces/web3.interface";
import { IndexingTransactionsModel } from "../../model/indexing-transactions.model";

interface IndexingTransactionsUseCaseRequest{
  transactions_io:TransactionIOModel
}

//TODO corrigir tipagem
class IndexingTransactionsUseCase {
  constructor(private web3Repository:Web3Interface){}

  exec({transactions_io}:IndexingTransactionsUseCaseRequest):(EventLog & {operation:string})[]{
    const indexing_transaction: any[] = []
    
    for(var i in transactions_io.contract_transactions?.contract_transactions_in){
      const index = parseInt(i);
      const transactionLog = transactions_io.contract_transactions?.contract_transactions_in[index];

      transactions_io.pair_transactions?.pair_transactions_in.forEach(transactionIn => {        

        if(transactionIn.transactionHash == transactionLog.transactionHash){          
          indexing_transaction.push({...transactionIn,operation:"buy"})
        }
        
      });
    }

    for(var i in transactions_io.contract_transactions?.contract_transactions_out){
      const index = parseInt(i);
      const transactionLog = transactions_io.contract_transactions?.contract_transactions_out[index];

      transactions_io.pair_transactions?.pair_transactions_out.forEach(transactionOut => {        
        
        if(transactionOut.transactionHash == transactionLog.transactionHash){
          //console.log(transactionLog.transactionHash)
          indexing_transaction.push({...transactionOut,operation:"sell"})  
        }

      });
    }

    indexing_transaction.sort((a:any,b:any) => a.blockNumber - b.blockNumber)

    const seenKeys:any = {};
    const filteredArray = indexing_transaction.filter(obj => {
      if (!seenKeys.hasOwnProperty(obj.transactionHash)) {
        seenKeys[obj.transactionHash] = true;
        return true;
      }
      return false;
    });

    return filteredArray as (EventLog & {operation:string})[]
  }

}

export {IndexingTransactionsUseCase};