/*
 This file is part of TrelloBot.
 Copyright (c) Snazzah 2016 - 2019
 Copyright (c) Trello Talk Team 2019 - 2020

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const Command = require('../structures/Command');

module.exports = class ShardInfo extends Command {
  get name() { return 'shardinfo'; }

  get _options() { return {
    aliases: ['shards'],
    permissions: ['embed'],
    cooldown: 0,
  }; }

  async exec(message, { _ }) {
    const serverMap = {};
    this.client.guilds.map(guild => {
      const shardID = guild.shard.id;
      if (serverMap[shardID])
        serverMap[shardID] += 1;
      else serverMap[shardID] = 1;
    });
    const embed = {
      color: this.client.config.embedColor,
      title: _('shardinfo.title', { username: this.client.user.username }),
      description: this.client.shards.map(shard => _('shardinfo.line', {
        id: shard.id,
        status: shard.status.toUpperCase(),
        ms: _.toLocaleString(shard.latency),
        guilds: _.toLocaleString(serverMap[shard.id])
      })).join('\n'),
      thumbnail: {
        url: this.client.config.iconURL
      }
    };
    return message.channel.createMessage({ embed });
  }

  get metadata() { return {
    category: 'categories.general',
  }; }
};