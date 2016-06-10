FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Install grunt
RUN npm install -g grunt

# Run grunt tasks (jshint, tests)
CMD ["grunt"]

# Bundle app source
COPY . /usr/src/app

EXPOSE 3005

CMD [ "node", "app.js" ]
