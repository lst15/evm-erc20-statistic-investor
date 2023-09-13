import telebot from "telebot";
import { profit } from "./app";
import { env } from "./env-schema";
const fs = require("fs");
const os = require("os");

const telegram_bot = new telebot({
  token:env.TG_BOT_TOKEN
})

telegram_bot.on(/^\/p (.+)$/,async (msg, props) => {
  const token_address = props.match[1];

  const loading_message = await telegram_bot.sendMessage(msg.from.id, "Loading ..." as any, { replyToMessage: msg.message_id });    
  const message = await profit(token_address)
  if(!message){
    return telegram_bot.editMessageText({chatId:loading_message.chat.id,messageId:loading_message.message_id},"O RPC tem um limite historico de 10 mil transações por contrato")      
  }
  
  return telegram_bot.editMessageText({chatId:loading_message.chat.id,messageId:loading_message.message_id},message)
})

telegram_bot.on(/^\/sw (.+)$/,async (msg, props) => {
  const user_address = props.match[1];

    // read file from hdd & split if from a linebreak to a array
    const ENV_VARS = fs.readFileSync("./.env", "utf8").split(os.EOL);

    // find the env we want based on the key
    const target = ENV_VARS.indexOf(ENV_VARS.find((line: string) => {
        return line.match(new RegExp("USER_ADDRESS"));
    }));

    // replace the key/value with the new value
    ENV_VARS.splice(target, 1, `USER_ADDRESS="${user_address}"`);

    // write everything back to the file system
    fs.writeFileSync("./.env", `${ENV_VARS.join(os.EOL)}`);
    env.USER_ADDRESS = user_address
    
    return await telegram_bot.sendMessage(msg.from.id, "Wallet address was updated with success " as any, { replyToMessage: msg.message_id });    
})

telegram_bot.start()

