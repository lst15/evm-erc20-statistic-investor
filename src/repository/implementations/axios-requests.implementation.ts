import axios from "axios";
import { RequestsInterface } from "../interfaces/requests.interface";
import { env } from "../../env-schema";

class AxiosRequestsImplementation implements RequestsInterface {
  async debugTraceTransaction(transactionHash: string): Promise<any> {
    const response = await axios.post(
      env.LOW_LEVEL_RPC,
      {
        method: "debug_traceTransaction",
        params: [
          transactionHash,
          {
            tracer: "callTracer",
          },
        ],
        id: 1,
        jsonrpc: "2.0",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.result.calls;
  }
}

export { AxiosRequestsImplementation };
