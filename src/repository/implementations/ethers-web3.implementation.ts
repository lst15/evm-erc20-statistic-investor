import { BigNumberish, ethers } from "ethers";
import { EthersHttpProvider } from "../../lib/ethers.provider";
import { Web3Interface } from "../interfaces/web3.interface";

class EthersWeb3Implementation implements Web3Interface {
  async getTransaction(transactionHash: string): Promise<any> {
    return await EthersHttpProvider.getTransaction(transactionHash);
  }

  async getTransactionReceipt(transactionHash: string): Promise<any> {
    return await EthersHttpProvider.getTransactionReceipt(transactionHash);
  }

  async getLogs(
    address: string,
    topics: string[],
    fromBlock?: number | undefined
  ): Promise<any[]> {
    return await EthersHttpProvider.getLogs({
      address: address,
      topics: topics,
      fromBlock: fromBlock,
      toBlock: "latest",
    });
  }

  async getCurrentBlock(): Promise<number> {
    return await EthersHttpProvider.getBlockNumber();
  }

  setContract(address: string, abi: Array<any>) {
    return new ethers.Contract(address, abi, EthersHttpProvider);
  }

  formatEther(value: BigNumberish): number {
    return parseFloat(ethers.formatEther(value));
  }

  async getBalance(address: string): Promise<any> {
    return await EthersHttpProvider.getBalance(address);
  }
}

export { EthersWeb3Implementation };
