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

exports.name = 'UPDATE_CUSTOM_FIELD_ITEM';

exports.exec = async data => {
  const _ = data.localeModule;
  const resultData = {
    description: data.embedDescription(['card', 'customField']),
    fields: []
  };
  const added = !data.customFieldItem.value;
  const removed = !data.oldData.value;
  switch (data.customField.type) {
  case 'checkbox':
    resultData.title = _(`webhooks.customfielditem_checkbox_${removed}`, {
      member: data.invoker.webhookSafeName,
      card: data.util.cutoffText(data.card.name, 50),
      customField: data.util.cutoffText(data.customField.name, 50)
    });
    break;
  case 'text':
    resultData.title = _(`webhooks.customfielditem_${!removed ? 'update' : 'remove'}`, {
      member: data.invoker.webhookSafeName,
      card: data.util.cutoffText(data.card.name, 50),
      customField: data.util.cutoffText(data.customField.name, 50)
    });
    if (!removed)
      resultData.fields.push({
        name: '*' + _('trello.old_v') + '*',
        value: data.oldData.value.text,
        inline: true
      });
    if (!added)
      resultData.fields.push({
        name: '*' + _('trello.new_v') + '*',
        value: data.customFieldItem.value.text,
        inline: true
      });
    break;
  case 'number':
    resultData.title = _(`webhooks.customfielditem_${!removed ? 'update' : 'remove'}`, {
      member: data.invoker.webhookSafeName,
      card: data.util.cutoffText(data.card.name, 50),
      customField: data.util.cutoffText(data.customField.name, 50)
    });
    if (!removed)
      resultData.fields.push({
        name: '*' + _('trello.old_v') + '*',
        value: _.toLocaleString(parseFloat(data.oldData.value.number)),
        inline: true
      });
    if (!added)
      resultData.fields.push({
        name: '*' + _('trello.new_v') + '*',
        value: _.toLocaleString(parseFloat(data.customFieldItem.value.number)),
        inline: true
      });
    break;
  case 'date':
    resultData.title = _(`webhooks.customfielditem_${!removed ? 'update' : 'remove'}`, {
      member: data.invoker.webhookSafeName,
      card: data.util.cutoffText(data.card.name, 50),
      customField: data.util.cutoffText(data.customField.name, 50)
    });
    if (!removed)
      resultData.fields.push({
        name: '*' + _('trello.old_v') + '*',
        value: _.moment(data.oldData.value.date).format('LLLL'),
        inline: true
      });
    if (!added)
      resultData.fields.push({
        name: '*' + _('trello.new_v') + '*',
        value: _.moment(data.customFieldItem.value.date).format('LLLL'),
        inline: true
      });
    break;
  case 'list':
    resultData.title = _(`webhooks.customfielditem_${data.oldData.idValue ? 'update' : 'remove'}`, {
      member: data.invoker.webhookSafeName,
      card: data.util.cutoffText(data.card.name, 50),
      customField: data.util.cutoffText(data.customField.name, 50)
    });
    break;
  }
  if (resultData.title)
    return data.send(resultData);
};