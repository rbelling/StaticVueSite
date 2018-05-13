# Custom static site generator based on `vue-cli`

## Dokku
We're using [dokku](https://github.com/dokku/dokku) to push changes via git to a Digital Ocean droplet based on Docker.
The setup is based on [this article](https://medium.com/@pimterry/host-your-node-app-on-dokku-digitalocean-1cb97e3ab041).

## Releasing
When working locally, assets will be served through vue-cli-service, with hot reloading.
On the remote host, `fastify-static` will serve the minified static bundle.

- `npm run docker:build` to build the image
- `npm run docker:run-detached` to run it
- Once done, the app should be visible at `http://localhost:49160`

Using `docker-machine` to point local docker to remote Docker engine.

First time only setup for releasing:
1) [Create ssh keys](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2)
2) Copy ssh keys to the remote host with `ssh-copy-id :user@:host`
3) Log into the remote host with `ssh ':user@:host'`
4) Create a Dokku app with `dokku apps:create your-app-name`
5) On your local machine, add the dokku remote with `git remote add dokku dokku@host-ip:your-app-name`

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
[ ] deploy to digitalocean a simple page, to test build / deploy / digitalocean. See if there's any script that can automate the deploy for you.

#### Nice to have

[ ] css modules
