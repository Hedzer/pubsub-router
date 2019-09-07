"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Request {
    constructor(hub, path, data) {
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
