var loader = require('./modules/loader');
var critical = window.critical = (function() {
    var s = {
        loader: loader,
    };
    var init = function() {
        s.loader.init('#js-app');
        s.loader.show();
    };
    var publicInterface = {
        init: init
    };
    return publicInterface;
})().init();