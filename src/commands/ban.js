module.exports = {
  name: 'ban',
  description: 'Ban a member',
  async execute({ message }) {
    if (!message.member.permissions.has('BanMembers')) {
      return message.reply('You need Ban Members permission.');
    }
    const member = message.mentions.members.first();
    if (!member) return message.reply('Mention a user to ban.');
    await member.ban();
    message.reply(`Banned ${member.user.tag}`);
  }
};
