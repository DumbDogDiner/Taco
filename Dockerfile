FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --ignore-scripts --production

FROM node:14-alpine

WORKDIR /app

COPY --from=0 /app .
COPY . .

CMD ["node", "src/bot.js"]