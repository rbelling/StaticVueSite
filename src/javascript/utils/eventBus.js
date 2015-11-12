var events = require('events');
var EventEmitter = require('events').EventEmitter;
var EVTS = require('../../../gulp/data/events');


var eventBus = window.eventBus = new EventEmitter();

module.exports = eventBus;

//usage: eventBus.on(EVTS.LOADING, show); eventBus.emit(EVTS.LOADING);