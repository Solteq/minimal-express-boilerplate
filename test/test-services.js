/*jshint mocha: true*/
"use strict";

const supertest = require("supertest");
const should = require("should");
const fs = require('fs');

// change ports to avoid conflict with dev server
process.env.PORT = 3006;

const app = require('../app');

describe("Test Animal Services", function(){

    it("should answer", function(done) {

        supertest(app)
            .get("/imalive")
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                done();
            });
    });

    describe("Test Dog Services", function() {

        it("Dog should say 'wuh'", function(done) {

            supertest(app)
                .get("/dog")
                .expect("Content-type",/json/)
                .expect(200)
                .end(function(err,res){
                    res.body.should.equal("Wuh");
                    done();
                });

        });

    });

});
