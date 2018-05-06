# Custom static site generator based on `vue-cli`

## Docker
Following instructions at https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
https://scotch.io/tutorials/how-to-host-a-node-js-app-on-digital-ocean#docker-machine-approach


When working locally, the files will be served through vue-cli-service, with hot reloading.
On the remote host,  the files will be served through `fastify-static` that will serve the minified bundle.

- `npm run docker:build` to build the image
- `npm run docker:run-detached` to run it
- Once done, the app should be visible at `http://localhost:49160`

Using `docker-machine` to point local docker to remote Docker engine.


## Build Setup

```
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### Todo
[ ] Dockerize the build so that it can be deployed.

[ ] Ensure it runs locally

[ ] deploy to digitalocean a simple page, to test build / deploy / digitalocean. See if there's any script that can automate the deploy for you.

#### Nice to have

[ ] css modules
