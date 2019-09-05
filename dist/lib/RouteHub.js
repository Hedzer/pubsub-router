"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Request_1 = __importDefault(require("./Request"));
const Response_1 = __importDefault(require("./Response"));
class RouteHub {
    constructor(receiver, sender) {
        this.receiver = receiver;
        this.sender = sender;
    }
    send(path, data = null) {
        data = data || this.receiver.matcher.match(path);
        let request = new Request_1.default(this);
        request.data = data;
        request.method = this.receiver.method;
        request.path = path;
        request.route = this.receiver.route;
        request.timestamp = new Date();
        this
            .receiver
            .emitter
            .emit('*', request);
        return request;
    }
    respond(request, data = null) {
        let response = new Response_1.default(request);
        response.data = data;
        response.method = request.method;
        response.path = request.path;
        response.request = request;
        response.route = request.route;
        response.timestamp = new Date();
        request
            .hub
            .sender
            .emitter
            .emit(request.path, response);
        return response;
    }
}
exports.default = RouteHub;
