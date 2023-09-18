const { Client, IntentsBitField } = require('discord.js');
const fs = require('fs');
const internal = require('stream');

const client = new Client({ 
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ]
});

// Load environment variables
require('dotenv').config();

// Load commands
const commands = new Map();
const commandFiles = fs.readdirSync('./source/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.set(command.name, command);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}! ✅`);
});



client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);
  if (!command) return;

  try {
    command.execute(interaction);
  } catch (error) {
    console.error(error);
  }
});

client.login(process.env.TOKEN);
