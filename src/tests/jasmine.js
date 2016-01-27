"use strict";
// let base = '../javascript';
let toolkit = require(`../javascript/utils/toolkit.js`);
// /Users/riccardo.bellingeri/CleanStart/src/javascript/utils

describe("A suite", function() {
    it("contains spec with an expectation", function() {
        expect(toolkit.testBodyTag()).toBe(3);
    });
});