"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ID {
    static *generate() {
        let serial = 0;
        let random = '';
        let time = '';
        while (true) {
            serial++;
            serial = serial % Number.MAX_SAFE_INTEGER;
            random = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
            time = (new Date()).getTime().toString(36);
            yield `${time}-${random}-${serial.toString(36)}`;
        }
    }
}
exports.default = ID;
