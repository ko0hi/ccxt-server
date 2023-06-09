FROM node:18

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn && node_modules/pm2/bin/pm2 install typescript

COPY src ./src
COPY tsconfig.json .

ENTRYPOINT [ "node_modules/pm2/bin/pm2", "start", "src/server.ts", "--no-daemon" ]