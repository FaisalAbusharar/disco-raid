const { PermissionsBitField } = require("discord.js");


module.exports = {
    name: 'ban-all',
    description: 'Ban all users in a server, except admins',
    async execute(interaction) {
        const { guild, user } = interaction;

        try {
            await guild.members.fetch(); // Fetch all members

            guild.members.cache.forEach(async (member) => {
                if (!member.bannable || member.roles.cache.some(role => role.permissions.has(PermissionsBitField.Flags.Administrator))) {
                    return;
                }

                try {
                    await member.ban();
                    user.send(`Banned ${member.user.tag}`);
                } catch (error) {
                    user.send(`Error banning ${member.user.tag}:`, error);
                }
            });

            user.send('All non-admin members have been banned.');
        } catch (error) {
            console.error('Error fetching members:', error);
            user.send('An error occurred while executing the command.');
        }
    }
}
