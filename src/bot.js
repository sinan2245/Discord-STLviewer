// Importation des variables d'environnement
require("dotenv").config();

// Importation des modules
const {
  Client,
  Collection,
  GatewayIntentBits,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
const fs = require("fs");

// Création du client Discord et déclaration de collections
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
  allowedMentions: {
    parse: ['users'],
    repliedUser: false,
  },
});
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

// Importe tous les fichiers de fonctions dans chaque dossier de fonctions
const functionFolders = fs.readdirSync('./src/functions');
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith('.js'));
  for (const file of functionFiles) require(`./functions/${folder}/${file}`)(client);
}

// Gestionnaire d'événements pour les rejets et les exceptions non gérées
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
process.on('uncaughtException', (err, origin) => {
  console.error(err);
});
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.error(err);
});
process.on('multipleResolves', (type, promise, reason) => {
  return;
});

// Gestionnaire d'événements pour les interactions de boutons
client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) {
    // Récupère la valeur du bouton
    const buttonValue = interaction.customId;

    // Vérifie que la valeur du bouton commence bien par "button_"
    if (!buttonValue.startsWith('button_')) return;

    // Récupère le nom de l'image associée au bouton
    const button = buttonValue.substring(7);

    // Vérifie que l'image associée au bouton existe
    if (fs.existsSync(`./data/${button}`)) {
      // Crée un nouvel objet AttachmentBuilder à partir de l'image associée au bouton
      const file = new AttachmentBuilder(`./data/${button}`);
      // Crée un nouvel objet EmbedBuilder pour l'affichage de l'image
      const embed = new EmbedBuilder
     .setTitle("Visualiseur STL")
      .setDescription("[**Votre stl visualisé en peu de temps !**](https://www.youtube.com/)")
      .setImage(`attachment://${button}`)
      .setFooter({
        text: "Made with ❤ by Sinan2245#0001",
      })
      .setColor(0xc573be);
    // Envoie l'embed et l'attachment au canal de l'interaction
    interaction.reply({
      embeds: [embed],
      files: [file],
      ephemeral: true,
    });
  } else {
    // Envoie un message d'erreur si l'image associée au bouton n'a pas été trouvée
    interaction.reply({
      content: `Impossible de trouver l'image correspondant à \`${button}\`\nLes propriétaires du bot ont supprimé l'image.`,
      ephemeral: true,
    });
  }
}
});

// Démarrage du client Discord
client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(process.env.token);
