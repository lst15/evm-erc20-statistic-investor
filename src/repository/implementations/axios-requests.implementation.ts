import axios from "axios";
import { RequestsInterface } from "../interfaces/requests.interface";

class AxiosRequestsImplementation implements RequestsInterface {

  async post(url:string,method: string, params: any[], id: number): Promise<any> {
    const response = await axios.post(
      url,      
      {
        'method': method,
        'params': params,
        'id': id,
        'jsonrpc': '2.0'
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response;
  }

}

export {AxiosRequestsImplementation};