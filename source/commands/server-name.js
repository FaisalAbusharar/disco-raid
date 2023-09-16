const { Application } = require("discord.js");

module.exports = {
    name: 'server-name',
    description: 'Changes the server name',
    async execute(interaction) {

    const { guild, user } = interaction;

    defaultserverName = "RAIDED"    

    let userServerName = interaction.options.getString('server_name') || defaultserverName;

    try {

        guild.setName(userServerName)
        user.send(`Changed server name to ${userServerName}`)
    } catch (error) {
        user.send({content: "Failed to change name, INTERNAL ERROR"})
        console.log(error)
    }

    }
}