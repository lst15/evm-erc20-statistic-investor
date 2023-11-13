import telebot from "telebot";
import { wallets } from "../../env-schema";

export function walletsListener(telegram_bot: telebot) {
  telegram_bot.on("/wallets", async (msg, props) => {
    return await telegram_bot.sendMessage(
      msg.from.id,
      wallets.join("\n") as any,
      {
        replyToMessage: msg.message_id,
      }
    );
  });
}
