module.exports = {
  name: 'online',
  description: 'Checks if DiscoRaid is online.',
  async execute(interaction) {
    const {user} = interaction
    user.send('DiscoRAID is online! ✅');
  }
}
