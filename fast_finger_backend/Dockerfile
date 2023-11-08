FROM node:20 AS base

WORKDIR /app

COPY package* .

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm" , "run" , "start" ]