FROM arian/android-react-native

# Create app directory
RUN mkdir -p /client-mobile
WORKDIR /client-mobile

# Install app dependencies
COPY AreaFrontMobile/package.json /client-mobile

RUN yarn && \
    yarn global add react-native-cli@2.0.1

# Bundle app source
COPY AreaFrontMobile/. /client-mobile
COPY global-src/. /client-mobile/src/

RUN ["npx", "jetify"]
RUN ["yarn", "run", "build-android"]

RUN cp -r /client-mobile/android/app/build/outputs/apk/release /apk_release

RUN ls /