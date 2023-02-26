module.exports = {
    name: "interactionCreate",
    async execute(client, interaction) {
        if(interaction.customId == "some-id") {
            interaction.reply({content: "Kliknąłeś przycisk", ephemeral: true})
        }

        /* Slash commands section */
        if(!interaction.isCommand()) return;

        if(interaction.commandName === "slash") {
            interaction.reply("Slash command!");
        }

        if(interaction.commandName === "test") {
            interaction.reply("Test command!");
        }
    }
}