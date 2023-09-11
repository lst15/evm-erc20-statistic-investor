export interface Web3Interface {
  getBalance(address:string):Promise<any>;
}