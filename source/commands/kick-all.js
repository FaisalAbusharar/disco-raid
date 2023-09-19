const { PermissionsBitField } = require("discord.js");


module.exports = {
    name: 'kick-all',
    description: 'kicks all users in a server, except admins',
    async execute(interaction) {
        const { guild, user } = interaction;

        try {
            await guild.members.fetch(); // Fetch all members
            

            guild.members.cache.forEach(async (member) => {
                if (!member.kickable || member.roles.cache.some(role => role.permissions.has(PermissionsBitField.Flags.Administrator))) {
                    return;
                }

                try {
                    await member.kick();
                    user.send(`Kicked ${member.user.tag}`);
                } catch (error) {
                    user.send(`Error Kicking ${member.user.tag}:`, error);
                }
            });

            user.send('All non-admin members have been Kicked.');
        } catch (error) {
            console.error('Error fetching members:', error);
            user.send('An error occurred while executing the command.');
        }
    }
}
