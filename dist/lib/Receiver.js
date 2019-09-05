"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReceiverHandle_1 = __importDefault(require("./ReceiverHandle"));
class Receiver {
    constructor(router) {
        this.router = router;
        this.store = router.store;
        this.sender = router.send;
    }
    get(route) {
        return new ReceiverHandle_1.default(this.store.retrieve('GET', route), route);
    }
    post(route) {
        return new ReceiverHandle_1.default(this.store.retrieve('POST', route), route);
    }
    put(route) {
        return new ReceiverHandle_1.default(this.store.retrieve('PUT', route), route);
    }
    patch(route) {
        return new ReceiverHandle_1.default(this.store.retrieve('PATCH', route), route);
    }
    delete(route) {
        return new ReceiverHandle_1.default(this.store.retrieve('DELETE', route), route);
    }
}
exports.default = Receiver;
