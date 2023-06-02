"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify = exports.stringifyInternal = void 0;
const findSymbolNameRegex = /^Symbol\((.*)\)$/;
function getSymbolDescription(s) {
    if (s.description !== undefined)
        return s.description;
    const m = findSymbolNameRegex.exec(String(s));
    return m && m[1].length ? m[1] : null;
}
function stringifyNumber(numValue) {
    switch (numValue) {
        case 0:
            return 1 / numValue === Number.NEGATIVE_INFINITY ? '-0' : '0';
        case Number.NEGATIVE_INFINITY:
            return 'Number.NEGATIVE_INFINITY';
        case Number.POSITIVE_INFINITY:
            return 'Number.POSITIVE_INFINITY';
        default:
            return numValue === numValue ? String(numValue) : 'Number.NaN';
    }
}
function isSparseArray(arr) {
    let previousNumberedIndex = -1;
    for (const index in arr) {
        const numberedIndex = Number(index);
        if (numberedIndex !== previousNumberedIndex + 1)
            return true;
        previousNumberedIndex = numberedIndex;
    }
    return previousNumberedIndex + 1 !== arr.length;
}
function stringifyInternal(value, previousValues) {
    const currentValues = previousValues.concat([value]);
    if (typeof value === 'object') {
        if (previousValues.indexOf(value) !== -1)
            return '[cyclic]';
    }
    switch (Object.prototype.toString.call(value)) {
        case '[object Array]': {
            const arr = value;
            if (arr.length >= 50 && isSparseArray(arr)) {
                const assignments = [];
                for (const index in arr) {
                    if (!Number.isNaN(Number(index)))
                        assignments.push(`${index}:${stringifyInternal(arr[index], currentValues)}`);
                }
                return assignments.length !== 0
                    ? `Object.assign(Array(${arr.length}),{${assignments.join(',')}})`
                    : `Array(${arr.length})`;
            }
            const stringifiedArray = arr.map((v) => stringifyInternal(v, currentValues)).join(',');
            return arr.length === 0 || arr.length - 1 in arr ? `[${stringifiedArray}]` : `[${stringifiedArray},]`;
        }
        case '[object BigInt]':
            return `${value}n`;
        case '[object Boolean]':
            return typeof value === 'boolean' ? JSON.stringify(value) : `new Boolean(${JSON.stringify(value)})`;
        case '[object Date]': {
            const d = value;
            return Number.isNaN(d.getTime()) ? `new Date(NaN)` : `new Date(${JSON.stringify(d.toISOString())})`;
        }
        case '[object Map]':
            return `new Map(${stringifyInternal(Array.from(value), currentValues)})`;
        case '[object Null]':
            return `null`;
        case '[object Number]':
            return typeof value === 'number' ? stringifyNumber(value) : `new Number(${stringifyNumber(Number(value))})`;
        case '[object Object]': {
            try {
                const toStringAccessor = value.toString;
                if (typeof toStringAccessor === 'function' && toStringAccessor !== Object.prototype.toString) {
                    return value.toString();
                }
            }
            catch (err) {
                return '[object Object]';
            }
            const mapper = (k) => `${k === '__proto__'
                ? '["__proto__"]'
                : typeof k === 'symbol'
                    ? `[${stringifyInternal(k, currentValues)}]`
                    : JSON.stringify(k)}:${stringifyInternal(value[k], currentValues)}`;
            const stringifiedProperties = [
                ...Object.keys(value).map(mapper),
                ...Object.getOwnPropertySymbols(value)
                    .filter((s) => {
                    const descriptor = Object.getOwnPropertyDescriptor(value, s);
                    return descriptor && descriptor.enumerable;
                })
                    .map(mapper),
            ];
            const rawRepr = '{' + stringifiedProperties.join(',') + '}';
            if (Object.getPrototypeOf(value) === null) {
                return rawRepr === '{}' ? 'Object.create(null)' : `Object.assign(Object.create(null),${rawRepr})`;
            }
            return rawRepr;
        }
        case '[object Set]':
            return `new Set(${stringifyInternal(Array.from(value), currentValues)})`;
        case '[object String]':
            return typeof value === 'string' ? JSON.stringify(value) : `new String(${JSON.stringify(value)})`;
        case '[object Symbol]': {
            const s = value;
            if (Symbol.keyFor(s) !== undefined) {
                return `Symbol.for(${JSON.stringify(Symbol.keyFor(s))})`;
            }
            const desc = getSymbolDescription(s);
            if (desc === null) {
                return 'Symbol()';
            }
            const knownSymbol = desc.startsWith('Symbol.') && Symbol[desc.substring(7)];
            return s === knownSymbol ? desc : `Symbol(${JSON.stringify(desc)})`;
        }
        case '[object Undefined]':
            return `undefined`;
        case '[object Int8Array]':
        case '[object Uint8Array]':
        case '[object Uint8ClampedArray]':
        case '[object Int16Array]':
        case '[object Uint16Array]':
        case '[object Int32Array]':
        case '[object Uint32Array]':
        case '[object Float32Array]':
        case '[object Float64Array]':
        case '[object BigInt64Array]':
        case '[object BigUint64Array]': {
            if (typeof Buffer !== 'undefined' && typeof Buffer.isBuffer === 'function' && Buffer.isBuffer(value)) {
                return `Buffer.from(${stringifyInternal(Array.from(value.values()), currentValues)})`;
            }
            const valuePrototype = Object.getPrototypeOf(value);
            const className = valuePrototype && valuePrototype.constructor && valuePrototype.constructor.name;
            if (typeof className === 'string') {
                const typedArray = value;
                const valuesFromTypedArr = typedArray.values();
                return `${className}.from(${stringifyInternal(Array.from(valuesFromTypedArr), currentValues)})`;
            }
            break;
        }
    }
    try {
        return value.toString();
    }
    catch (_a) {
        return Object.prototype.toString.call(value);
    }
}
exports.stringifyInternal = stringifyInternal;
function stringify(value) {
    return stringifyInternal(value, []);
}
exports.stringify = stringify;
