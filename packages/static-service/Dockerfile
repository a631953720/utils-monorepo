FROM node:18-alpine
WORKDIR /static-service
COPY ./dist/packages/static-service .
# https://github.com/nodejs/node/issues/40195
RUN npm install --max-old-space-size=4096
COPY ./node_modules/@myorg ./node_modules/@myorg
CMD node ./main.js
