module.exports = {
  name: 'setprefix',
  description: 'Set custom prefix for this server',
  async execute({ message, args, db }) {
    if (!message.member.permissions.has('Administrator')) {
      return message.reply('You need administrator permission.');
    }
    const prefix = args[0];
    if (!prefix) return message.reply('Provide a prefix.');
    db.setPrefix(message.guild.id, prefix);
    message.reply(`Prefix set to \`${prefix}\``);
  }
};
