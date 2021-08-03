FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm cache clean -f
RUN npm install -g n
RUN n stable
RUN yarn

COPY . .

EXPOSE 8080

CMD [ "ts-node", "./src/app.ts" ]

