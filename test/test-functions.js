/*jshint mocha: true*/
"use strict";

const dogSay = require('../src/functions').dogSay;
const should = require('should');

describe("Tests for Animal functions", function() {

    describe("Test Dog", function() {

        it("Should say 'Wuh' ", function() {

            const result = dogSay();

            result.should.equal('Wuh');

        });

    });

});
