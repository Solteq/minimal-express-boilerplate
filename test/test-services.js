/*jshint mocha: true*/
"use strict";

const supertest = require("supertest");
const should = require("should");
const fs = require('fs');

// change ports to avoid conflict with dev server
process.env.PORT = 3006;

const app = require('../app');