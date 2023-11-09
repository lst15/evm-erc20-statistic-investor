import telebot from "telebot";
import { wallets } from "../../env-schema";
import { GetWalletsProfitAction } from "../actions/get-wallets-profit.action";
import { pDto } from "../dto/p.dto";

export function pListener(telegram_bot: telebot) {
  telegram_bot.on(/^\/p (.+)$/, async (msg, props) => {
    const token_address = await pDto(props);

    if (token_address instanceof Error) {
      return await telegram_bot.sendMessage(msg.from.id, token_address as any, {
        replyToMessage: msg.message_id,
      });
    }

    const loading_message = await telegram_bot.sendMessage(
      msg.from.id,
      "Loading ... " as any,
      { replyToMessage: msg.message_id }
    );
    console.log(`[requesting] ${token_address}`);
    const message = await GetWalletsProfitAction(
      wallets,
      token_address.toLowerCase()
    );

    if (!message) {
      return telegram_bot.editMessageText(
        {
          chatId: loading_message.chat.id,
          messageId: loading_message.message_id,
        },
        "O RPC tem um limite historico de 10 mil transações por contrato"
      );
    }

    return await telegram_bot.sendMessage(msg.from.id, message as any, {
      replyToMessage: msg.message_id,
      parseMode: "markdown",
    });
  });
}
