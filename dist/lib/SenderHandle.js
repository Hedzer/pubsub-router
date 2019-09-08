"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Request_1 = __importDefault(require("./Request"));
const Handle_1 = __importDefault(require("./Handle"));
const Constants_1 = require("./Constants");
class SenderHandle extends Handle_1.default {
    constructor(emitters, path) {
        super(emitters, path);
        this.listeners = new Map();
    }
    request(data) {
        this.defer(() => this.send(data));
        return this;
    }
    receive(receiver, count = Infinity) {
        let listener = this.createListener(receiver, (req) => this.send(req), count);
        this
            .emitters
            .forEach(emitter => emitter[Constants_1.SENDER]
            .on(this.route, listener));
        return this;
    }
    receiveOnce(receiver) {
        return this.receive(receiver, 1);
    }
    remove() {
        this.removeAll(this.listeners, Constants_1.SENDER);
        return this;
    }
    createListener(receiver, requester, count = Infinity) {
        let received = 0;
        let listenerId = this.getId();
        let listener = (res) => {
            if (this.isDisabled) {
                return;
            }
            if (received >= count) {
                this.removeListener(this.listeners, Constants_1.SENDER, listenerId);
                return;
            }
            received++;
            let request;
            try {
                request = receiver(res);
                if (request) {
                    requester(request);
                }
            }
            catch (error) {
                if (request) {
                    request.error = error;
                }
            }
            return request;
        };
        this.listeners.set(listenerId, listener);
        return listener;
    }
    send(data) {
        this
            .emitters
            .map(emitter => {
            let req = new Request_1.default(emitter, this.route, data);
            req.hub = emitter;
            req.method = emitter.method;
            req.route = emitter.route;
            return { request: req, emitter };
        })
            .forEach(pair => pair
            .emitter[Constants_1.RECEIVER]
            .emit('*', pair.request));
        return this;
    }
}
exports.default = SenderHandle;
