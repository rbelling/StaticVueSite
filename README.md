Front End Boilerplate which uses the following technologies:

 - Node.js & NPM
 - Gulp
 - SASS
 - Browserify
 - ES6
 - Babel
 - Handlebars templates
 - TweenLite

####SETUP THE PROJECT
Run `npm install` to setup the project and download the dependencies - tested with Node v5 and NPM v3.

#####compile and watch
Run `gulp` to watch files and develop locally.

Run `gulp build` with one of the following arguments: `--local` `--stage` `--prod` to compile and minify for the target environment.

####ENVIRONMENT VARIABLES
This project provides an easy way to handle different working environments. For example, on a local environment all reference to assets in the markup are prefixed with a `./`, while in production they can be in a different folder. 
Have a look at the `gulp/data/env` folder to see where different values are kept. 
