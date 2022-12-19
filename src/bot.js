require("dotenv").config();
const {
  token
} = process.env;
const {
  Client,
  Collection,
  GatewayIntentBits,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],
  allowedMentions: {
    parse: [
      'users'
    ],
    repliedUser: false,
  }
}, );
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
process.on("uncaughtException", (err, origin) => {
  console.log(err);
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(err);
});
process.on('multipleResolves', (type, promise, reason) => {
  return
});

client.on('interactionCreate', async (interaction) => {
  if(interaction.isButton()) {
  const buttonvalue = interaction.customId;
  if(!buttonvalue.startsWith("button_")) return;
  const button = buttonvalue.substring(7);
  if(fs.existsSync(`./data/${button}`)) {
    const file = new AttachmentBuilder('./data/' + button);
    const embed = new EmbedBuilder()
      .setTitle('Visualiseur STL')
      .setDescription("[**Votre stl visualisé en peu de temps !**](https://www.youtube.com/c/lesfrerespoulain)")
      .setImage(`attachment://${button}`)
      .setFooter({
      text: "Made with ❤ by Sinan2245#0001",
      })
     .setColor(0xc573be);
    interaction.reply({
      embeds: [embed],
      files: [file],
      ephemeral: true,
    })
  } else {
    interaction.reply({
      content: `Impossible de trouver l'image correspondant à \`${button}\`\nLes propriétaires du bot ont supprimé l'image.`,
      ephemeral: true,
    });
  }
}
  
  
})


client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);