# Discord Bot

This is a basic multi-server Discord bot built with Node.js and `discord.js`. It includes:

- Per-server prefix stored in SQLite
- Ticket system
- Admin commands (kick/ban)
- Giveaways
- Welcome messages
- Feedback system
- Temporary voice channels

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a bot in the [Discord Developer Portal](https://discord.com/developers/applications) and copy its token.
3. Set the environment variable `DISCORD_TOKEN` to the bot token.
4. Start the bot:
   ```bash
   npm start
   ```

Commands can be prefixed with the configured server prefix (default `!`).
