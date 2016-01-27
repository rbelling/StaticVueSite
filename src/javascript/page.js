global.eventBus = require('./utils/eventBus');
global.$ = require('npm-zepto');

window.app = require('./main.js')($('#js-app'));
