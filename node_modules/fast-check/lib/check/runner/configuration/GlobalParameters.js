"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetConfigureGlobal = exports.readConfigureGlobal = exports.configureGlobal = void 0;
const globalThis_1 = require("../../../utils/globalThis");
const globalParametersSymbol = Symbol('fast-check/GlobalParameters');
function configureGlobal(parameters) {
    globalThis_1.getGlobal()[globalParametersSymbol] = parameters;
}
exports.configureGlobal = configureGlobal;
function readConfigureGlobal() {
    return globalThis_1.getGlobal()[globalParametersSymbol];
}
exports.readConfigureGlobal = readConfigureGlobal;
function resetConfigureGlobal() {
    delete globalThis_1.getGlobal()[globalParametersSymbol];
}
exports.resetConfigureGlobal = resetConfigureGlobal;
