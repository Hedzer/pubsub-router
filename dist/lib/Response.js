"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    constructor(request, data) {
        this.request = request;
        this.method = request.method;
        this.path = request.path;
        this.route = request.route;
        this.timestamp = new Date();
        this.params = request.params;
        this.data = data;
    }
    copy() {
        let response = new Response(this.request, this.data);
        response.request = this.request;
        response.method = this.method;
        response.path = this.path;
        response.route = this.route;
        response.timestamp = this.timestamp;
        response.params = this.params;
        response.data = this.data;
        response.error = this.error;
        return response;
    }
}
exports.default = Response;
