const { Command } = require('faux-classes')

module.exports = class Info extends Command {
  get name() { return 'info' }
  get aliases() { return ['ℹ'] }

  emojiEmbedFallback(message, customEmoji, fallbackEmoji) {
    if(this.client.emoji(message))
      return customEmoji;
      else fallbackEmoji;
  }

  async exec(message) {
    let servers = await this.client.serverCount()
    let embed = {
      color: this.client.config.color_scheme,
      title: `Information about ${this.client.user.username}.`,
      description: 'This bot is using [Faux](https://github.com/Snazzah/Faux)\n\n'
                  + `**:computer: Version** ${this.client.pkg.version}\n`
                  + `**:computer: Faux Version** ${this.client.FAUX_VER}\n`
                  + `**:clock: Uptime**: ${process.uptime() ? process.uptime().toString().toHHMMSS() : "???"}\n`
                  + `**:gear: Memory Usage**: ${(process.memoryUsage().heapUsed / 1000000).toFixed(2)} MB\n`
                  + `**:file_cabinet: Servers**: ${servers.formatNumber()}\n\n`
                  + `**:globe_with_meridians: Website**: https://trellobot.xyz/\n`
                  + `**${this.emojiEmbedFallback(message, "<:trello:230098361796001793>", ":blue_book:")} Trello Board**: https://trello.com/b/eXWMPIA9/discord-trello-bot\n`
                  + `**${this.emojiEmbedFallback(message, "<:patreon:584291173934432256>", ":money_with_wings:")} Patreon**: **Coming soon**\n`,
      thumbnail: {
        url: "https://cdn.discordapp.com/avatars/620126394390675466/ee92bddcf57babd0e42a9fb0baf9e722.png?size=256"
      }
    }

    message.channel.send("", { embed })
  }

  get permissions() { return ['embed'] }

  get helpMeta() { return {
    category: 'General',
    description: 'Gets general info about the bot.'
  } }
}
