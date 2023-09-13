import telebot from "telebot";
import { profit } from "./app";
import { env } from "./env-schema";

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

telegram_bot.start()