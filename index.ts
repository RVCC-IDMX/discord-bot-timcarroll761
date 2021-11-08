/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import DiscordJS, { Intents } from "discord.js";
import dotenv from "dotenv";
import cowsay from "./utils/cowsay";

dotenv.config();

const prefix = process.env.PREFIX || "";
const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log("The bot is ready");
});

client.on("messageCreate", (message) => {
  let messageStr = message.content;
  if (messageStr.startsWith(prefix)) {
    messageStr = messageStr.slice(3);
    // remove the prefix

    while (messageStr.startsWith(" ")) {
      messageStr = messageStr.slice(1);
    } // remove leading whitespace

    const messageWords = messageStr.toLowerCase().split(" ");
    const command = messageWords.shift();
    // tokenize the message

    if (command === "ping") {
      message
        .reply({
          content: "pong",
        })
        .then()
        .catch(console.error);
    }

    if (command === "reply") {
      const replyStr = messageWords.join("\n");
      message
        .reply({
          content: replyStr,
        })
        .then()
        .catch(console.error);
    }

    if (command === "cowsay") {
      cowsay(messageWords.shift()).then((data) => {
        message
          .reply({
            content: `\`\`\`${data}\`\`\``,
          })
          .then()
          .catch((err) => {
            if (err.code === 50035) {
              message.reply({
                content:
                  "The selected cow can't be rendered in discord. Please try again.",
              });
            }
          });
      });
      message.react("🤖").then().catch(console.error);
    }
  }
});
client.login(process.env.TOKEN);
