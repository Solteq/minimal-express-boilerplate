"use strict";

const dogSay = require('./functions').dogSay;

const appRouter = function(app) {

    /**
     * @apiDefine Forbidden
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 403 Forbidden
     *     {"message": "You don't have access to this service"}
     */

    /**
     * @api {get} /imalive I'm alive
     * @apiGroup boilerplate
     * @apiName boilerplate
     *
     * @apiExample {curl} Example usage:
     *     curl http://localhost:3000/imalive
     *
     * @apiSuccessexample Success-Response:
     * HTTP/1.1 200 OK
     * OK
     */
    app.get("/imalive", function(req, res) {

        res.json({"status": "OK"});

    });

    app.get("/dog", function(req, res) {

        res.json(dogSay());

    });

};

module.exports = appRouter;
