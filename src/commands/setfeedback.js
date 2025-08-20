module.exports = {
  name: 'setfeedback',
  description: 'Set feedback channel',
  async execute({ message, args, db }) {
    if (!message.member.permissions.has('Administrator')) {
      return message.reply('You need administrator permission.');
    }
    const channel = message.mentions.channels.first();
    if (!channel) return message.reply('Mention a channel.');
    db.setFeedbackChannel(message.guild.id, channel.id);
    message.reply(`Feedback channel set to ${channel}`);
  }
};
