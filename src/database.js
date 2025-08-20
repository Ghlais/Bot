const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, '../data.sqlite'));

// Initialize tables
const init = () => {
  db.run(`CREATE TABLE IF NOT EXISTS guilds (
      id TEXT PRIMARY KEY,
      prefix TEXT DEFAULT '!',
      welcome_channel TEXT,
      feedback_channel TEXT
    )`);
};

init();

module.exports = {
  getGuild(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM guilds WHERE id = ?', [id], (err, row) => {
        if (err) return reject(err);
        if (!row) return resolve({ id, prefix: '!' });
        resolve(row);
      });
    });
  },
  setPrefix(id, prefix) {
    db.run(
      'INSERT INTO guilds(id, prefix) VALUES(?, ?) ON CONFLICT(id) DO UPDATE SET prefix=excluded.prefix',
      [id, prefix]
    );
  },
  setWelcomeChannel(id, channelId) {
    db.run(
      'INSERT INTO guilds(id, welcome_channel) VALUES(?, ?) ON CONFLICT(id) DO UPDATE SET welcome_channel=excluded.welcome_channel',
      [id, channelId]
    );
  },
  setFeedbackChannel(id, channelId) {
    db.run(
      'INSERT INTO guilds(id, feedback_channel) VALUES(?, ?) ON CONFLICT(id) DO UPDATE SET feedback_channel=excluded.feedback_channel',
      [id, channelId]
    );
  }
};
