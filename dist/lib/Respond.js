"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("rxjs/internal/Observable");
require("rxjs/Observable");
Observable_1.Observable.prototype.respond = function (responder) {
    this.forEach(req => req.hub.respond(req, responder(req.data)));
};
