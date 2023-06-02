import { getGlobal } from '../../../utils/globalThis.js';
const globalParametersSymbol = Symbol('fast-check/GlobalParameters');
export function configureGlobal(parameters) {
    getGlobal()[globalParametersSymbol] = parameters;
}
export function readConfigureGlobal() {
    return getGlobal()[globalParametersSymbol];
}
export function resetConfigureGlobal() {
    delete getGlobal()[globalParametersSymbol];
}
