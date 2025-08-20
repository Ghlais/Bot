module.exports = {
  name: 'ticket',
  description: 'Create a private support ticket',
  async execute({ message }) {
    const channel = await message.guild.channels.create({
      name: `ticket-${message.author.id}`,
      type: 0,
      permissionOverwrites: [
        { id: message.guild.id, deny: ['ViewChannel'] },
        { id: message.author.id, allow: ['ViewChannel', 'SendMessages'] },
        { id: message.client.user.id, allow: ['ViewChannel', 'SendMessages'] }
      ]
    });
    message.reply(`Ticket created: ${channel}`);
  }
};
