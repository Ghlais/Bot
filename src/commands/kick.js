module.exports = {
  name: 'kick',
  description: 'Kick a member',
  async execute({ message }) {
    if (!message.member.permissions.has('KickMembers')) {
      return message.reply('You need Kick Members permission.');
    }
    const member = message.mentions.members.first();
    if (!member) return message.reply('Mention a user to kick.');
    await member.kick();
    message.reply(`Kicked ${member.user.tag}`);
  }
};
