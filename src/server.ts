import telebot from "telebot";
import { profit } from "./app";
import { env } from "./env-schema";

const telegram_bot = new telebot({
  token:env.TG_BOT_TOKEN
})

telegram_bot.on(/^\/profit (.+)$/,async (msg, props) => {
  const token_address = props.match[1];
  //const transactions = await profit(token_address)
  
  const message = `

  [NAME]



  `

  return telegram_bot.sendMessage(msg.from.id, message as any, { replyToMessage: msg.message_id });
})

telegram_bot.start()