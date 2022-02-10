FROM node:13.6.0-alpine

# Create app directory
RUN mkdir -p /server
WORKDIR /server

# Install app dependencies
COPY package.json /server
RUN yarn && \
    yarn global add nodemon

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
# Bundle app source
COPY . /server
EXPOSE 3001
CMD /wait && yarn run dev