FROM node:15.4

WORKDIR /app
COPY package.json .
RUN npm install --save --legacy-peer-deps
COPY . .

CMD npm run start:dev