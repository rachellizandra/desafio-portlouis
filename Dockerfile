FROM node:16

COPY . ./app

WORKDIR /app

RUN npm install

RUN npm i -g jest

CMD ["node", "index.js"]