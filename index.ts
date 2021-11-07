/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import DiscordJS, { Intents } from "discord.js";
import dotenv from "dotenv";
import cowsay from "./utils/cowsay";

dotenv.config();

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log("The bot is ready");
});

client.on("messageCreate", (message) => {
  if (message.content === "ping") {
    message
      .reply({
        content: "pong",
      })
      .then()
      .catch(console.error);
  }

  if (message.content === "cowsay") {
    message
      .reply({
        content: `\`\`\`${cowsay()}\`\`\``,
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
    message.react("🤖").then().catch(console.error);
  }
});
client.login(process.env.TOKEN);
