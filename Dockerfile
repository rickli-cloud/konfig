FROM node:22-alpine

WORKDIR /opt/konfig

COPY ./build .
COPY ./package.json .
COPY ./package-lock.json .

RUN npm ci --omit=dev

CMD [ "node", "-r", "dotenv/config", "." ]
