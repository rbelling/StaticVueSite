var _ = require('lodash');
var buttons = require('./style/buttons');
var style = (function() {
    /*================================
  =            CONSTANTS            =
  ================================*/
    var M = 1; //animation timing multiplier  
    var DEFAULT_EASE = Expo.easeOut;
    var DEFAULT_TRANSFORM_PERSPECTIVE = 'none';
    var DURATION = {
        XXS: 0.05 * M,
        XS: 0.1 * M,
        S: 0.2 * M,
        M: 0.4 * M,
        L: 0.6 * M,
        XL: 0.8 * M,
        XXL: 1 * M,
        ONESECOND: 1 * M,
    };
    /*================================
      =            TWEENS             =
      ================================*/
    /*----------  Imagesequence  ----------*/
    var exampleTween = {
        d: DURATION.S,
        p: {
            force3D: true,
            translateZ: 0,
        },
    };

    /*----------  Rotate and fade away ----------*/
    var _rotateInTiming = DURATION.M;
    var rotateIn = _.merge({}, buttons.rotateIn, {
        rotate: {
            d: _rotateInTiming,
        },
        shrink: {
            d: _rotateInTiming
        },
        fade: {
            p: {
                delay: _rotateInTiming / 2
            },
            d: _rotateInTiming / 2
        }
    });
    var publicInterface = {
        {
            M
        }, {
            DURATION
        }, {
            DEFAULT_EASE
        }, {
            rotateIn
        }
    };

    return publicInterface;

})();
module.exports = style;