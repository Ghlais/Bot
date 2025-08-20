const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'giveaway',
  description: 'Start a giveaway',
  async execute({ message, args }) {
    const duration = parseInt(args.shift(), 10);
    const prize = args.join(' ');
    if (!duration || !prize) {
      return message.reply('Usage: giveaway <seconds> <prize>');
    }
    const embed = new EmbedBuilder()
      .setTitle('Giveaway')
      .setDescription(`Prize: ${prize}\nReact with 🎉 to enter!\nEnds in ${duration}s`)
      .setColor('Gold');
    const giveawayMessage = await message.channel.send({ embeds: [embed] });
    await giveawayMessage.react('🎉');
    setTimeout(async () => {
      const fetched = await giveawayMessage.fetch();
      const reaction = fetched.reactions.cache.get('🎉');
      if (!reaction) return message.channel.send('No participants.');
      const users = await reaction.users.fetch();
      const entrants = users.filter(u => !u.bot);
      const winner = entrants.random();
      if (winner) message.channel.send(`Congratulations ${winner} you won **${prize}**!`);
      else message.channel.send('No valid participants.');
    }, duration * 1000);
  }
};
