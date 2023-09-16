const { PermissionsBitField } = require("discord.js");

module.exports = {
    name: 'admin-all',
    description: 'Give ALL users ADMINISTRATOR permissions',
    async execute(interaction) {
        const { guild, user } = interaction;
        const defaultRoleName = "ADMIN";

        let userRoleName = interaction.options.getString('role-name') || defaultRoleName;
        console.log(userRoleName);

        let adminRole;
        try {
            adminRole = await guild.roles.create({
                name: `${userRoleName}`,
                permissions:
                [PermissionsBitField.Flags.Administrator,
                 PermissionsBitField.Flags.KickMembers] }) ;

                 
        } catch (error) {
            user.send("Internal error occurred while making role.");
            console.error(error);
            return;
        }

        try {
            guild.members.cache.forEach(async (member) => {
                await member.roles.add(adminRole);
            });
            user.send("Permissions given to all users.");
        } catch(error) {
            user.send("Internal error occurred, check console.");
            console.error(error);
        } 
    }
}
