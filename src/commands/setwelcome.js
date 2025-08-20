module.exports = {
  name: 'setwelcome',
  description: 'Set welcome channel',
  async execute({ message, args, db }) {
    if (!message.member.permissions.has('Administrator')) {
      return message.reply('You need administrator permission.');
    }
    const channel = message.mentions.channels.first();
    if (!channel) return message.reply('Mention a channel.');
    db.setWelcomeChannel(message.guild.id, channel.id);
    message.reply(`Welcome channel set to ${channel}`);
  }
};
