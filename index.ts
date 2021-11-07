import DiscordJS, { Intents } from "discord.js";
import dotenv from "dotenv";
import cowsay from "cowsay";

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
      .then(console.log)
      .catch(console.error);
  }

  if (message.content === "cowsay") {
    message
      .reply({
        content: `\`\`\`
      ${cowsay.say({ text: "Welcome to the candy shop" })}
      \`\`\``,
      })
      .then(console.log)
      .catch(console.error);
    message.react("🤖").then(console.log).catch(console.error);
  }
});
client.login(process.env.TOKEN);
