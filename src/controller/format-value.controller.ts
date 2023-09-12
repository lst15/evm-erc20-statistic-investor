import { BigNumberish } from "ethers";
import { FormatValueFactory } from "../factory/format-value.factory";

const FormatValueController = (value:BigNumberish) => {
  const factory = FormatValueFactory();  
  
  try {
    const execute = factory.exec({value:value});
    return execute;
  } catch (error) {
    throw error;
  }

}

export {FormatValueController}