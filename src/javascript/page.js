import eventBus from './utils/eventBus';
import $ from 'npm-zepto';
import _ from 'lodash';
import app from './main.js';


global.$ = $;
window.eventBus = window.eventBus || eventBus;
global._ = _;
window.onload = function () {
  app.init();
};

