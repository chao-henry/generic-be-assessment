FROM node:10.16

WORKDIR /opt

COPY ./build ./
COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install --production

USER node
CMD ["node", "/opt/server/app.js"]
