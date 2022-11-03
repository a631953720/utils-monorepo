FROM node:lts-alpine
WORKDIR /my-app
COPY ./dist/packages/my-app .
RUN npm install --production
CMD node ./main.js