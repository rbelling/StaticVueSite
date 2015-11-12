var buttons = (function() {
    var s = {};
    var rotateIn = {
        fade: {
            p: {
                opacity: 0,
            },
        },
        shrink: {
            p: {
                scale: 0.4,
            }
        },
        rotate: {
            p: {
                rotationZ: '-=220',
                force3D: false,
            },
        }
    };
    var publicInterface = {
        rotateIn: rotateIn,
    };
    return publicInterface;
})();

module.exports = buttons;