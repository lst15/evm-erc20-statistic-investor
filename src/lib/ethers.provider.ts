import { ethers } from "ethers";
import { env } from "../env-schema";

export const EthersHttpProvider = new ethers.JsonRpcProvider(env.RPC);