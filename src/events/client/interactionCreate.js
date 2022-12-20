const { InteractionType } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    // Si l'interaction est une commande envoyée en chat
    if (interaction.isChatInputCommand()) {
      // Récupération du nom de la commande et de l'objet 'commands' du client
      const { commandName } = interaction;
      const { commands } = client;

      // Récupération de l'objet 'command' associé au nom de la commande
      const command = commands.get(commandName);

      // Si aucune commande n'a été trouvée, on envoie une erreur
      if (!command) return new Error(`Cette commande n'existe pas !`);

      // Exécution de la commande
      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "Une erreur est survenue lors de l'exécution du menu",
          ephemeral: true,
        });
      }
    }
    // Si l'interaction est la soumission d'un formulaire modal
    else if (interaction.type == InteractionType.ModalSubmit) {
      // Récupération de l'objet 'modals' du client
      const { modals } = client;

      // Récupération de l'objet 'modal' associé à l'ID personnalisé de l'interaction
      const { customId } = interaction;
      const modal = modals.get(customId);

      // Si aucun formulaire n'a été trouvé, on envoie une erreur
      if (!modal) return new Error("Ce formulaire n'existe pas");

      // Exécution du formulaire
      try {
        await modal.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "Une erreur est survenue lors de l'exécution du formulaire",
          ephemeral: true,
        });
      }
    }
  },
};
