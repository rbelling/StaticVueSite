# Custom static site generator based on `vue-cli`



### Todo
[x] Dockerize the build so that it can be deployed.

[ ] deploy to digitalocean a simple page, to test build / deploy / digitalocean. See if there's any script that can automate the deploy for you.

### Nice to have
[ ] css modules


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


## Docker
- `npm run docker:build` to build the image
- `npm run docker:run-detached` to run it
- Once done, the app should be visible at `http://localhost:49160`
