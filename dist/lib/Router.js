"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sender_1 = __importDefault(require("./Sender"));
const Receiver_1 = __importDefault(require("./Receiver"));
const Store_1 = __importDefault(require("./Store"));
class Router {
    constructor() {
        let store = new Store_1.default();
        this.store = store;
        this.receive = new Receiver_1.default(this);
        this.send = new Sender_1.default(this);
    }
}
exports.default = Router;
