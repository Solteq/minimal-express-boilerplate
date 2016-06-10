"use strict";

const express = require("express");
const fs = require('fs');

const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const port = process.env.PORT || 3005;
const services = require("./src/services.js")(app);

const server = app.listen(port, function() {
    console.log("Listening on port %s...", server.address().port);
});

module.exports = server;
