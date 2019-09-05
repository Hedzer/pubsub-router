"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventemitter3_1 = __importDefault(require("eventemitter3"));
const route_parser_1 = __importDefault(require("route-parser"));
class EmitterHub {
    constructor(method, route) {
        this.sender = new eventemitter3_1.default();
        this.receiver = new eventemitter3_1.default();
        this.method = method;
        this.route = route;
        this.matcher = new route_parser_1.default(route);
    }
}
exports.default = EmitterHub;
