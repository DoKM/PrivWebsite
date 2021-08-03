FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -g n
RUN yarn

COPY . .

EXPOSE 8080

CMD [ "run", "webserver" ]

