import { EthersHttpProvider } from "../../lib/ethers.provider";
import { Web3Interface } from "../interfaces/web3.interface";

class EthersWeb3Implementation implements Web3Interface {

  async getBalance(address: string): Promise<any> {
    return await EthersHttpProvider.getBalance(address)    
  }

  

}

export {EthersWeb3Implementation};