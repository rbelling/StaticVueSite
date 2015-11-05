var assert = require('assert');

describe('#es6', function() {
    it('should test an es6 functionality to test the build process', function() {
        var testES6 = function() {
            var a = [
                "Hydrogen",
                "Helium",
                "Lithium",
                "Beryl­lium"
            ];

            var a2 = a.map(function(s) {
                return s.length
            });

            var a3 = a.map(s => s.length);
            return {
                es5: a2,
                es6: a3
            };
        };
        assert(testES6().es5 === testES6().es6 === 4);
    })
});