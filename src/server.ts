import telebot from "telebot";
import { profit } from "./app";
import { env, removeWallet, wallets } from "./env-schema";
import { ethers } from "ethers";
import { EthersHttpProvider } from "./lib/ethers.provider";
import { resolve } from "path";
import { readFile, writeFileSync } from "fs";
import * as envfile from "envfile";

const fs = require("fs");
const os = require("os");

const telegram_bot = new telebot({
  token: env.TG_BOT_TOKEN,
});

telegram_bot.on(/^\/p (.+)$/, async (msg, props) => {
  const token_address = props.match[1];

  if (msg.from.id != 646283289 && msg.from.id != 797182203) {
    return await telegram_bot.sendMessage(
      msg.from.id,
      "You can't use this" as any,
      { replyToMessage: msg.message_id }
    );
  }
  const code = await EthersHttpProvider.getCode(token_address);

  if (code == "0x") {
    return await telegram_bot.sendMessage(
      msg.from.id,
      "Invalid token address" as any,
      { replyToMessage: msg.message_id }
    );
  }

  if (!ethers.isAddress(token_address)) {
    return await telegram_bot.sendMessage(
      msg.from.id,
      "Invalid token address" as any,
      { replyToMessage: msg.message_id }
    );
  }

  if (wallets.length == 0) {
    return await telegram_bot.sendMessage(
      msg.from.id,
      "You need to set a wallet" as any,
      { replyToMessage: msg.message_id }
    );
  }

  const loading_message = await telegram_bot.sendMessage(
    msg.from.id,
    "Loading ..." as any,
    { replyToMessage: msg.message_id }
  );
  console.log(`[requesting] ${token_address}`);
  const message = await profit(wallets, token_address.toLowerCase());

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

// telegram_bot.on(/^\/addwallet (.+)$/, async (msg, props) => {
//   const user_address = props.match[1];

//   if (!ethers.isAddress(user_address)) {
//     return await telegram_bot.sendMessage(
//       msg.from.id,
//       "Invalid token address" as any,
//       { replyToMessage: msg.message_id }
//     );
//   }

//   if (msg.from.id != 646283289 && msg.from.id != 797182203) {
//     return await telegram_bot.sendMessage(
//       msg.from.id,
//       "You can't use this" as any,
//       { replyToMessage: msg.message_id }
//     );
//   }

telegram_bot.on(/^\/addwallet (.+)$/, async (msg, props) => {
  const user_address = props.match[1].toLowerCase();
  if (wallets.includes(user_address)) {
    return await telegram_bot.sendMessage(
      msg.from.id,
      "Wallet already added" as any,
      {
        replyToMessage: msg.message_id,
      }
    );
  }

  if (!ethers.isAddress(user_address)) {
    return await telegram_bot.sendMessage(
      msg.from.id,
      "That isn't a valid address" as any,
      {
        replyToMessage: msg.message_id,
      }
    );
  }

  wallets.push(user_address);

  return await telegram_bot.sendMessage(
    msg.from.id,
    "Wallet added with success" as any,
    {
      replyToMessage: msg.message_id,
    }
  );
});

telegram_bot.on(/^\/rmwallet (.+)$/, async (msg, props) => {
  const user_address = props.match[1].toLowerCase();

  if (!wallets.includes(user_address)) {
    return await telegram_bot.sendMessage(
      msg.from.id,
      "Wallet not found" as any,
      {
        replyToMessage: msg.message_id,
      }
    );
  }

  removeWallet(user_address.toLowerCase());
  return await telegram_bot.sendMessage(
    msg.from.id,
    "Wallet removed with success" as any,
    {
      replyToMessage: msg.message_id,
    }
  );
});

telegram_bot.on("/wallets", async (msg, props) => {
  return await telegram_bot.sendMessage(
    msg.from.id,
    wallets.join("\n") as any,
    {
      replyToMessage: msg.message_id,
    }
  );
});

export const writeEnvToFile = (
  envVariables: { key: string; value: any }[]
): void => {
  // get `.env` from path of current directory
  const path = resolve(__dirname, "../.env");
  readFile(path, "utf8", (err: any, data: any) => {
    if (err) {
      console.error(err);
      return;
    }

    const parsedFile = envfile.parse(data);
    envVariables.forEach((envVar: { key: string; value: any }) => {
      if (envVar.key && envVar.value) {
        parsedFile[envVar.key] = envVar.value;
      }
    });
    writeFileSync(path, envfile.stringify(parsedFile));

    // NB: You should now be able to see your .env with the new values,
    // also note that any comments or newlines will be stripped from
    // your .env after the writeFileSync, but all your pre-existing
    // vars should still appear the .env.
  });
};

telegram_bot.start();
