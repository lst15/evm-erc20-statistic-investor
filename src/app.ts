import { ethers } from "ethers"
import { FormatValueController } from "./controller/format-value.controller"

(() => {
  const teste = FormatValueController(ethers.toBigInt(10000))
  console.log(teste)

})()