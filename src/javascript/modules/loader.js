/*----------  Javascript responsible for the loader  ----------*/
var EVTS = require('../../../gulp/data/events');

var loader = (function() {
    var s = {
        loadingClass: 'is-loading',
        label: 'js--loader-label',
        eventBus: window.eventBus || require('../utils/eventBus')
    };
    var init = function(ref) {
        s.ref = ref;
        s.eventBus.on(EVTS.LOADING, show);
        s.eventBus.on(EVTS.LOADED, hide);
    };;
    var show = function() {
        console.time(s.label);
    };
    var hide = function() {
        console.timeEnd(s.label);
    };
    var publicInterface = {
        init, show, hide
    }
    return publicInterface;
})();

module.exports = loader;