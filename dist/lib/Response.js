"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ID_1 = __importDefault(require("./ID"));
let id = ID_1.default.generate();
class Response {
    constructor(request, data) {
        this.id = id.next().value;
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
