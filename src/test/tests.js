var assert = require('assert');
// var Page = require('../javascript/page.js');

describe('#dummy', function() {
    it('should test a basic addition', function() {
        var dummy = {
            check: function() {
                return 1 + 1;
            }
        };

        assert(dummy.check() === 3);
    })
});