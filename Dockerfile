# no optymalization
FROM node:lts-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm@8.15.2
RUN pnpm install

COPY . .

RUN npm run build

CMD [ "node", "/app/build/index.js" ]