#ENVIRONMENT VARIABLES
They are kept in the gulp/data/env folder. There is a gulp task (env.js) that reads those files and gets the right parameters.

#COMPILE AND BUILD THE PROJECT
Run 'npm install' to setup the project - built with Node v4 and NPM v2

Run 'gulp' to locally test the page

Run 'gulp build' with the following arguments: --stage --prod --local   to compile and minify for the target environment
