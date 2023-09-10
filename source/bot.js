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
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
  if (message.content === '<@1150483197503741962>') {
    message.reply('Bot is Online ✅');
  }
});
