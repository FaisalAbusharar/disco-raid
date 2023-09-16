module.exports = {
  name: 'online',
  description: 'Checks if Disco-RAID is online.',
  async execute(interaction) {
    const {user} = interaction
    user.send('DiscoRAID is online! ✅');
  }
}
