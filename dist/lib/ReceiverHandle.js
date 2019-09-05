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
        console.log("ReceiverHandle", emitters, route);
    }
    respond(responder, count = Infinity) {
        console.log("CREATING RESPONDER");
        let sent = 0;
        let listenerId = this.getId();
        let listener = (req) => {
            console.log("RESPONDING");
            if (this.isDisabled) {
                return;
            }
            console.log("RESPOND NOT DISABLED");
            if (sent >= count) {
                this.remove(this.listeners, listenerId);
                return;
            }
            console.log("GETTING TO SEND");
            sent++;
            let response = new Response_1.default(req, responder(req));
            this.send(response);
            return response;
        };
        this.listeners.set(listenerId, listener);
        this
            .emitters
            .forEach(emitter => emitter
            .receiver
            .on('*', listener));
        this.emitters.forEach(e => console.log("EMITTER ROUTE", e.receiver.eventNames()));
        console.log("EMITTER COUNT", this.emitters.length);
        return this;
    }
    respondOnce(responder) {
        return this.respond(responder, 1);
    }
    send(response) {
        console.log("SENDING RESPONSE", response);
        this
            .emitters
            .forEach(emitter => emitter
            .sender
            .emit(response.request.path, response));
        return this;
    }
}
exports.default = ReceiverHandle;
