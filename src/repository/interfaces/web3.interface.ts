import { BigNumberish, Contract } from "ethers";

export interface Web3Interface {
  getBalance(address: string): Promise<any>;
  formatEther(value: BigNumberish): number;
  setContract(address: string, abi: any[]): Contract;
  getCurrentBlock(): Promise<number>;
  getLogs(address: string, topics: any[], fromBlock?: number): Promise<any[]>;
  getTransaction(transactionHash: string): Promise<any>;
  getTransactionReceipt(transactionHash: string): Promise<any>;
}
