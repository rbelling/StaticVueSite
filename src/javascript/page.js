/*----------  Globals  ----------*/
global.eventBus = require('./utils/eventBus');
global.$ = require('npm-zepto');
global._ = require('lodash');

window.app = require("./main.js")($('#js-app'));