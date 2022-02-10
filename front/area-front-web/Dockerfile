FROM node:13.6.0-alpine

# Create app directory
RUN mkdir -p /client-web
WORKDIR /client-web

# Install app dependencies
COPY area-front-web/package.json /client-web

RUN yarn && \
    yarn global add react-scripts

# Bundle app source
COPY area-front-web/. /client-web
COPY global-src/. /client-web/src/
EXPOSE 3000

CMD [ "yarn", "start"]

RUN ls /