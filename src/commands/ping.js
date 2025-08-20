module.exports = {
  name: 'ping',
  description: 'Simple ping command',
  async execute({ message }) {
    await message.reply('Pong!');
  }
};
