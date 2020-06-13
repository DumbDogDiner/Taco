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

module.exports = class Ping extends Command {
  get name() { return 'ping'; }

  get _options() { return {
    aliases: ['p', 'pong'],
    cooldown: 0,
  }; }

  async exec(message, { _ }) {
    const currentPing = Array.from(this.client.shards.values())
      .map(shard => shard.latency).reduce((prev, val) => prev + val, 0);
    const timeBeforeMessage = Date.now();
    const sentMessage = await message.channel.createMessage(`> :ping_pong: ***${_('ping.message')}***\n` +
      `> ${_('ping.ws', { ms: _.toLocaleString(currentPing) })}`);
    await sentMessage.edit(
      `> :ping_pong: ***${_('ping.message')}***\n` +
      `> ${_('ping.ws', { ms: _.toLocaleString(currentPing) })}\n` +
      `> ${_('ping.rest', { ms: _.toLocaleString(Date.now() - timeBeforeMessage) })}`);
  }

  get metadata() { return {
    category: 'categories.general',
  }; }
};