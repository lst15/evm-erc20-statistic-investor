export interface RequestsInterface {
  debugTraceTransaction(transactionHash: string): Promise<any>;
}
