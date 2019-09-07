"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Request_1 = __importDefault(require("./Request"));
const Handle_1 = __importDefault(require("./Handle"));
class SenderHandle extends Handle_1.default {
    constructor(emitters, path) {
        super(emitters, path);
        this.listeners = new Map();
        console.log("SenderHandle", emitters, path);
    }
    request(data) {
        this.defer(() => {
            console.log("RUNNING REQUEST");
            this
                .emitters
                .map(emitter => {
                let req = new Request_1.default(emitter, this.route, data);
                req.hub = emitter;
                req.method = emitter.method;
                req.route = emitter.route;
                return req;
            })
                .forEach((request) => this.send(request));
        });
        return this;
    }
    receive(receiver, count = Infinity) {
        let received = 0;
        let listenerId = this.getId();
        let listener = (res) => {
            if (this.isDisabled) {
                return;
            }
            if (received >= count) {
                this.remove(this.listeners, listenerId);
                return;
            }
            received++;
            let request;
            try {
                request = receiver(res);
                if (request) {
                    this.send(request);
                }
            }
            catch (error) {
                if (request) {
                    request.error = error;
                }
                this
                    .catchers
                    .forEach(catcher => { try {
                    catcher(res, request, error);
                }
                catch (err) {
                    console.log(err);
                } });
            }
            return request;
        };
        this.listeners.set(listenerId, listener);
        this
            .emitters
            .forEach(emitter => emitter
            .sender
            .on(this.route, listener));
        return this;
    }
    send(request) {
        //console.log("SENDER SENDING", request);
        console.log("SENDER EMITTER COUNT", this.emitters.length);
        this.emitters.forEach(e => console.log("SENDER EMITTER ROUTE", e.receiver.eventNames()));
        this
            .emitters
            .forEach(emitter => emitter
            .receiver
            .emit('*', request));
        return this;
    }
}
exports.default = SenderHandle;
