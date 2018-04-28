
FROM node:8.4-alpine

# Create a non-root user to use for container
RUN addgroup -S app && adduser -S -G app app

# set production environment
ENV NODE_ENV production

# Install nodejs and git
RUN apk update && apk add -u git && apk add sudo && apk add openssh-client

# switch working directory
WORKDIR /app
ENV PWD /app

# Add app files and run npm install
COPY . /app
RUN npm install

# add the rest of the app code.

RUN chown -R app:app /app
USER app

# Fire up node - TODO fix this command since you dont have app.js
CMD ["node", "app.js"]
