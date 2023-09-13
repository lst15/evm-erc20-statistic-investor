import { Web3Interface } from "../../repository/interfaces/web3.interface";

//TODO corrigir tipagem
interface FormatTransactionsIOUseCaseRequest {
  cost_group:any[]
}


class FormatTransactionsIOUseCase {
  constructor(private web3Repository:Web3Interface){}

  exec({cost_group}:FormatTransactionsIOUseCaseRequest){
    const formated:any = []

    cost_group.forEach(group => {
      formated.push({

        bought:{
          eth:this.web3Repository.formatEther(group.bought),
          wei:group.bought
        },
        
        total_cost_transaction:{
          eth:this.web3Repository.formatEther(group.total_cost_transaction),
          wei:group.total_cost_transaction
        },

        total_gasfee:{
          eth:this.web3Repository.formatEther(group.total_gasfee),
          wei:group.total_gasfee          
        },
        
        total_sell:{
          eth:this.web3Repository.formatEther(group.total_sell),
          wei:group.total_sell            
        }

      })
    });

    console.log(formated)
  } 

}

export {FormatTransactionsIOUseCase};