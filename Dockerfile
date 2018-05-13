# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

FROM node:10.0-alpine

# set production environment
#ENV NODE_ENV production

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies.
# we are only copying the package.json file. This allows us to take advantage of cached Docker layers
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
COPY package*.json ./

# If you are building your code for production
# RUN npm install --only=production
RUN npm install

# Copy new files to the image after npm install has finished running
COPY . .
EXPOSE 80

# Serve static files through fastify-static
CMD [ "npm", "start" ]
