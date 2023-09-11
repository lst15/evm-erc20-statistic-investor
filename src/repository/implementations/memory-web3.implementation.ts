import { Web3Interface } from "../interfaces/web3.interface";

class MemoryWeb3Implementation implements Web3Interface {

  getBalance(address: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

}
