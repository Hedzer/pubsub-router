"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ID_1 = __importDefault(require("./ID"));
let id = ID_1.default.generate();
class Request {
    constructor(hub, path, data) {
        this.id = id.next().value;
        this.method = 'GET';
        this.route = '';
        this.timestamp = new Date();
        this.path = '';
        this.hub = hub;
        this.path = path;
        this.params = hub.matcher.match(path) || {};
        this.data = data;
    }
    copy() {
        let request = new Request(this.hub, this.path, this.data);
        request.method = this.method;
        request.route = this.route;
        request.timestamp = this.timestamp;
        request.path = this.path;
        request.params = this.params;
        request.data = this.data;
        request.hub = this.hub;
        request.error = this.error;
        return request;
    }
}
exports.default = Request;
