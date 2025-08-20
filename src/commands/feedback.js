module.exports = {
  name: 'feedback',
  description: 'Send feedback to configured channel',
  async execute({ message, args, db }) {
    const content = args.join(' ');
    if (!content) return message.reply('Provide feedback content.');
    const config = await db.getGuild(message.guild.id);
    if (!config.feedback_channel) return message.reply('Feedback channel not set.');
    const channel = message.guild.channels.cache.get(config.feedback_channel);
    if (!channel) return message.reply('Feedback channel not found.');
    channel.send(`Feedback from ${message.author}:\n${content}`);
    message.reply('Feedback sent.');
  }
};
