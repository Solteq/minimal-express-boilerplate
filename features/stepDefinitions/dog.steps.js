"use strict";

module.exports = function() {
	
const supertest = require("supertest");
const should = require("should");
const app = require('../../app');

var answer;

	this.Given(/^a dog is alive$/, function (callback) {
		supertest(app)
			.get("/imalive")
			.expect("Content-Type",/json/)
			.expect(200)
			.end(function(err,res){
				res.status.should.equal(200);
				callback();
		});
	});

	this.When(/^I call for a dog$/, function (callback) {
		supertest(app)
			.get("/dog")
			.expect("Content-Type",/json/)
			.expect(200)
			.end(function(err,res){
				answer = res.body;
				callback();
		});
	});
	
	this.Then(/^dog should answer "([^"]*)"$/, function (arg1, callback) {
		answer.should.equal(arg1);
		callback();
	});

};