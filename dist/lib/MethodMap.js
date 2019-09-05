"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MethodMap {
    constructor() {
        this.GET = new Map();
        this.POST = new Map();
        this.PUT = new Map();
        this.PATCH = new Map();
        this.DELETE = new Map();
    }
    get(method) {
        return this[method];
    }
}
exports.default = MethodMap;
