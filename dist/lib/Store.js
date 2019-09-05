"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MethodMap_1 = __importDefault(require("./MethodMap"));
const EmitterHub_1 = __importDefault(require("./EmitterHub"));
class Store {
    constructor() {
        this.emitters = new MethodMap_1.default();
        this.unreceived = new Map();
    }
    resolve(method, path) {
        console.log("RESOLVE", method, path);
        let matches = [];
        this
            .emitters
            .get(method)
            .forEach((value, key) => value
            .matcher
            .match(path) ?
            matches.push(value) :
            null);
        console.log(matches);
        return matches;
    }
    create(method, route) {
        console.log("CREATING ", method, route);
        return this
            .emitters
            .get(method)
            .set(route, new EmitterHub_1.default(method, route))
            .get(route);
    }
    retrieve(method, route) {
        let resolved = this.resolve(method, route);
        return resolved.length ? resolved : [this.create(method, route)];
    }
}
exports.default = Store;
