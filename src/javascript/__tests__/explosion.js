var assert = require('assert');
var jsdom = require('mocha-jsdom');
var _ = require('lodash');
var Toolkit;


// var Page = require('../javascript/page.js');
describe('#dummy', function() {
    it('should test a basic addition', function() {
        var dummy = {
            check: function() {
                return 1 + 2;
            }
        };

        assert(dummy.check() === 3);
    });
});

describe('#angle', function() {
    it('should test the return value of a function that calculates an angle between two points', function() {
        var getAngle = function(a, b, quadrant) {
            //computes the angle of the vector that connects a to b
            //each variable is an object with x and y
            //the coordinates system is assumed to start at top left corner of the container
            if (b.x >= a.x) {
                if (b.y <= a.y) {
                    //FIRST QUADRANT     
                    value = quadrant ? 'first' : 45 * 1;
                } else {
                    //FOURTH QUADRANT           
                    value = quadrant ? 'fourth' : 45 * 7;
                }
            } else {

                if (b.y <= a.y) {
                    //SECOND QUADRANT
                    value = quadrant ? 'second' : 45 * 3;
                } else {
                    //THIRD QUADRANT
                    value = quadrant ? 'third' : 45 * 5;
                }
            }
            return value;
        };
        var a = {
                x: 2,
                y: 2
            },
            b = {
                x: 3,
                y: 1
            },
            c = {
                x: 3,
                y: 3
            },
            d = {
                x: 1,
                y: 3
            },
            e = {
                x: 1,
                y: 1
            };

        assert(getAngle(a, b, true) === 'first');
        assert(getAngle(a, e, true) === 'second');
        assert(getAngle(a, d, true) === 'third');
        assert(getAngle(a, c, true) === 'fourth');
    })
});