FROM node:20-alpine

WORKDIR usr/src/app

COPY package*.json ./

RUN npm cache clean --force && npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

