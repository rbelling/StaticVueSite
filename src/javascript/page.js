require("babel-core/register");
var $ = global.$ = require('npm-zepto');

window.app = require("./main.js")($('#js-app'));