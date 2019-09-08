"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Response_1 = __importDefault(require("./Response"));
const Handle_1 = __importDefault(require("./Handle"));
const Constants_1 = require("./Constants");
class ReceiverHandle extends Handle_1.default {
    constructor(emitters, route) {
        super(emitters, route);
        this.listeners = new Map();
    }
    respond(responder, count = Infinity) {
        let listener = this.createListener(responder, (res) => this.send(res), count);
        this
            .emitters
            .forEach(emitter => emitter[Constants_1.RECEIVER]
            .on('*', listener));
        return this;
    }
    respondOnce(responder) {
        return this.respond(responder, 1);
    }
    subscribe(subscriber, count = Infinity) {
        let listener = this.createListener(subscriber, () => { }, count);
        this
            .emitters
            .forEach(emitter => emitter
            .receiver
            .on('*', listener));
        return this;
    }
    subscribeOnce(subscriber) {
        return this.subscribe(subscriber, 1);
    }
    remove() {
        this.removeAll(this.listeners, Constants_1.RECEIVER);
        return this;
    }
    createListener(responder, sender, count = Infinity) {
        let sent = 0;
        let listenerId = this.getId();
        let listener = (req) => {
            if (this.isDisabled) {
                return;
            }
            if (sent >= count) {
                this.removeListener(this.listeners, Constants_1.RECEIVER, listenerId);
                return;
            }
            sent++;
            let response;
            try {
                response = new Response_1.default(req, responder(req));
                sender(response);
            }
            catch (error) {
                if (response) {
                    response.error = error;
                }
            }
            return response;
        };
        this.listeners.set(listenerId, listener);
        return listener;
    }
    send(response) {
        this
            .emitters
            .forEach(emitter => emitter[Constants_1.SENDER]
            .emit(response.request.path, response));
        return this;
    }
}
exports.default = ReceiverHandle;
