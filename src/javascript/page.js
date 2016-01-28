import eventBus from './utils/eventBus';
import $ from 'npm-zepto';
import _ from 'lodash';
import app from './main.js';


global.$ = $;
global.eventBus = eventBus;
global._ = _;
app.init();
