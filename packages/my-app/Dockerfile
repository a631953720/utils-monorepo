FROM node:lts-alpine
WORKDIR /my-app
COPY ./dist/packages/my-app .
RUN npm install --production
COPY ./node_modules/@myorg ./node_modules/@myorg
#COPY ./.env ./node_modules/@myorg/basic/.env
#COPY ./.env ./node_modules/@myorg/basic/.env
CMD node ./main.js
