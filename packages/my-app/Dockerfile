FROM node:lts-alpine
WORKDIR /my-app
COPY ./dist/packages/my-app .
RUN npm install --production
COPY ./node_modules/@myorg ./node_modules/@myorg
CMD node ./main.js
