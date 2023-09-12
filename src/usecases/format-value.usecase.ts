import { BigNumberish } from "ethers";
import { FormatValueModel } from "../model/format-value.model";
import { Web3Interface } from "../repository/interfaces/web3.interface";

interface FormatValueUseCaseRequest {
  value:BigNumberish;
}

class FormatValueUseCase {
  constructor(private web3Repository:Web3Interface){}

  exec({value}:FormatValueUseCaseRequest){

    if(!value){
      throw new Error("Valor não pode ser formatado pois é nulo")
    }

    const format_value:FormatValueModel = {eth:this.web3Repository.formatEther(value),wei:value}
    return format_value;
  }

}

export {FormatValueUseCase};