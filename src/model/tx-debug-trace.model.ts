export class TxDebugTraceModel {
  public from: string = "";
  public gas: string = "";
  public gasUsed: string = "";
  public to: string = "";
  public input: string = "";
  public output?: string = "";
  public calls: any;
  public type?: string;
  public value?: string;
}
