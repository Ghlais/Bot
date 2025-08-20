const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const db = require('./database');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
for (const file of fs.readdirSync(commandsPath)) {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('guildMemberAdd', async member => {
  const guildConfig = await db.getGuild(member.guild.id);
  if (!guildConfig.welcome_channel) return;
  const channel = member.guild.channels.cache.get(guildConfig.welcome_channel);
  if (!channel) return;
  const embed = new EmbedBuilder()
    .setTitle('Welcome!')
    .setDescription(`Welcome to the server, ${member}!`)
    .setColor('Green');
  channel.send({ embeds: [embed] });
});

client.on('messageCreate', async message => {
  if (message.author.bot || !message.guild) return;
  const guildConfig = await db.getGuild(message.guild.id);
  const prefix = guildConfig.prefix || '!';
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/\s+/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);
  if (!command) return;
  try {
    await command.execute({ client, message, args, db });
  } catch (err) {
    console.error(err);
    message.reply('There was an error executing that command.');
  }
});

client.on('voiceStateUpdate', async (oldState, newState) => {
  if (!newState.channel || newState.channel.name !== 'Create') return;
  const channel = await newState.guild.channels.create({
    name: `Temp ${newState.member.user.username}`,
    type: 2,
    parent: newState.channel.parent
  });
  await newState.setChannel(channel);
  const checkEmpty = setInterval(async () => {
    if (channel.members.size === 0) {
      clearInterval(checkEmpty);
      channel.delete().catch(() => {});
    }
  }, 30000);
});

client.login(process.env.DISCORD_TOKEN);
