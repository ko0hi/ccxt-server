FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn && yarn add nodemon ts-node typescript

COPY src ./src
COPY tsconfig.json .

ENTRYPOINT [ "yarn", "start" ]