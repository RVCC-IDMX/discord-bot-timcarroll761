import DiscordJS, { Intents } from "discord.js";
import dotenv from "dotenv";
import cowsay, { IOptions } from "cowsay";

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
    const opts: IOptions = {
      text: "For science!",
      r: true,
    };
    message
      .reply({
        content: `\`\`\`
      ${cowsay.say(opts)}
      \`\`\``,
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
