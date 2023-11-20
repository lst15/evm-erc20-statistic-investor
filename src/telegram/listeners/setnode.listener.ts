import telebot from "telebot";
import { writeEnvToFile } from "../../utils/write-env-file";
import { env } from "../../env-schema";

export function setNodeListener(telegram_bot: telebot) {
  telegram_bot.on(/^\/setnode (.+)$/, async (msg, props) => {
    const args = props.match[1];

    writeEnvToFile([
      {
        key: "LOW_LEVEL_RPC",
        value: args,
      },
    ]);

    env.LOW_LEVEL_RPC = args;

    return await telegram_bot.sendMessage(
      msg.from.id,
      `Low Level endpoint was defined` as any,
      {
        replyToMessage: msg.message_id,
      }
    );
  });
}
