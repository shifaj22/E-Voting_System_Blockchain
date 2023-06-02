"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGlobal = void 0;
const internalGlobalThis = (function () {
    if (typeof self !== 'undefined') {
        return self;
    }
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    throw new Error('unable to locate global object');
})();
const getGlobal = () => internalGlobalThis;
exports.getGlobal = getGlobal;
