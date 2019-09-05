"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SenderHandle_1 = __importDefault(require("./SenderHandle"));
class Sender {
    constructor(router) {
        this.router = router;
        this.store = router.store;
        this.receiver = router.receive;
    }
    get(path, data) {
        let handle = new SenderHandle_1.default(this.store.retrieve('GET', path), path);
        if (arguments.length > 1) {
            handle.request(data);
        }
        return handle;
    }
    post(path, data) {
        let handle = new SenderHandle_1.default(this.store.retrieve('POST', path), path);
        if (arguments.length > 1) {
            handle.request(data);
        }
        return handle;
    }
    put(path, data) {
        let handle = new SenderHandle_1.default(this.store.retrieve('PUT', path), path);
        if (arguments.length > 1) {
            handle.request(data);
        }
        return handle;
    }
    patch(path, data) {
        let handle = new SenderHandle_1.default(this.store.retrieve('PATCH', path), path);
        if (arguments.length > 1) {
            handle.request(data);
        }
        return handle;
    }
    delete(path, data) {
        let handle = new SenderHandle_1.default(this.store.retrieve('DELETE', path), path);
        if (arguments.length > 1) {
            handle.request(data);
        }
        return handle;
    }
}
exports.default = Sender;
