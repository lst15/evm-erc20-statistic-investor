export interface RequestsInterface {
  post(url:string,method:string,params:any[],id:number):Promise<any>;
}