FROM node:10

WORKDIR /usr/src/app

COPY . .

COPY package*.json ./
RUN npm cache clean -f
RUN npm install -g n
RUN n stable
RUN yarn



EXPOSE 8080

CMD ["npm","run","start"]

