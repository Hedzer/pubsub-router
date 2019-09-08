"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ID_1 = __importDefault(require("./ID"));
let id = ID_1.default.generate();
class Handle {
    constructor(emitters, route) {
        this.isDisabled = false;
        this.emitters = emitters;
        this.route = route;
    }
    disable() {
        this.isDisabled = true;
        return this;
    }
    enable() {
        this.isDisabled = false;
        return this;
    }
    disabled(disabled) {
        this.isDisabled = disabled;
        return this;
    }
    removeAll(listeners, type) {
        listeners
            .forEach((listener, id) => this.removeListener(listeners, type, id));
        return this;
    }
    removeListener(listeners, type, listenerId) {
        this
            .emitters
            .forEach(emitter => emitter[type]
            .removeListener('*', listeners.get(listenerId)));
        listeners.delete(listenerId);
        return this;
    }
    getId() {
        return id.next().value;
    }
    defer(method) {
        setTimeout(method, 0);
        return this;
    }
}
exports.default = Handle;
