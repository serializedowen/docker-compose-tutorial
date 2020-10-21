FROM node:12

WORKDIR /usr/local/app
COPY package*.json ./
RUN npm install --registry=https://registry.npm.taobao.org
COPY . .

ENV NPM_CONFIG_LOGLEVEL warn
EXPOSE 8080

CMD [ "npm", "start" ]