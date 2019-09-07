"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Response_1 = __importDefault(require("./Response"));
const Handle_1 = __importDefault(require("./Handle"));
class ReceiverHandle extends Handle_1.default {
    constructor(emitters, route) {
        super(emitters, route);
        this.listeners = new Map();
    }
    respond(responder, count = Infinity) {
        let sent = 0;
        let listenerId = this.getId();
        let listener = (req) => {
            if (this.isDisabled) {
                return;
            }
            if (sent >= count) {
                this.remove(this.listeners, listenerId);
                return;
            }
            sent++;
            let response;
            try {
                response = new Response_1.default(req, responder(req));
                this.send(response);
            }
            catch (error) {
                if (response) {
                    response.error = error;
                }
                this
                    .catchers
                    .forEach(catcher => { try {
                    catcher(req, response, error);
                }
                catch (err) {
                    console.log(err);
                } });
            }
            return response;
        };
        this.listeners.set(listenerId, listener);
        this
            .emitters
            .forEach(emitter => emitter
            .receiver
            .on('*', listener));
        return this;
    }
    respondOnce(responder) {
        return this.respond(responder, 1);
    }
    send(response) {
        this
            .emitters
            .forEach(emitter => emitter
            .sender
            .emit(response.request.path, response));
        return this;
    }
}
exports.default = ReceiverHandle;
