FROM node:10

RUN npm i -g npm firebase-tools

WORKDIR /app

COPY . .
#COPY *fire* ./
WORKDIR /app/functions

#COPY functions/*.json ./

RUN npm install
#RUN npm run build

ENV GOOGLE_APPLICATION_CREDENTIALS="key.json"

CMD npm start

#docker --rm build -t bootcamp .
#docker run -it bootcamp /bin/bash
