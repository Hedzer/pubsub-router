"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Handle {
    constructor(emitters, route) {
        this.isDisabled = false;
        this.currentId = 0;
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
    remove(listeners, listenerId) {
        this
            .emitters
            .forEach(emitter => emitter
            .sender
            .removeListener('*', listeners.get(listenerId)));
        listeners.delete(listenerId);
        return this;
    }
    getId() {
        this.currentId++;
        return this.currentId;
    }
    defer(method) {
        setTimeout(method, 0);
        return this;
    }
}
exports.default = Handle;
