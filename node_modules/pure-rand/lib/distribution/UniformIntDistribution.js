"use strict";
exports.__esModule = true;
exports.uniformIntDistribution = void 0;
var UniformIntDistributionInternal_1 = require("./internals/UniformIntDistributionInternal");
var ArrayInt_1 = require("./internals/ArrayInt");
var UniformArrayIntDistributionInternal_1 = require("./internals/UniformArrayIntDistributionInternal");
var sharedA = { sign: 1, data: [0, 0] };
var sharedB = { sign: 1, data: [0, 0] };
var sharedC = { sign: 1, data: [0, 0] };
var sharedData = [0, 0];
function uniformLargeIntInternal(from, to, rangeSize, rng) {
    var rangeSizeArrayIntValue = rangeSize <= Number.MAX_SAFE_INTEGER
        ? ArrayInt_1.fromNumberToArrayInt64(sharedC, rangeSize)
        : ArrayInt_1.substractArrayInt64(sharedC, ArrayInt_1.fromNumberToArrayInt64(sharedA, to), ArrayInt_1.fromNumberToArrayInt64(sharedB, from));
    if (rangeSizeArrayIntValue.data[1] === 0xffffffff) {
        rangeSizeArrayIntValue.data[0] += 1;
        rangeSizeArrayIntValue.data[1] = 0;
    }
    else {
        rangeSizeArrayIntValue.data[1] += 1;
    }
    var g = UniformArrayIntDistributionInternal_1.uniformArrayIntDistributionInternal(sharedData, rangeSizeArrayIntValue.data, rng);
    return [sharedData[0] * 0x100000000 + sharedData[1] + from, g[1]];
}
function uniformIntInternal(from, to, rng) {
    var rangeSize = to - from;
    if (rangeSize <= 0xffffffff) {
        var g = UniformIntDistributionInternal_1.uniformIntDistributionInternal(rangeSize + 1, rng);
        g[0] += from;
        return g;
    }
    return uniformLargeIntInternal(from, to, rangeSize, rng);
}
function uniformIntDistribution(from, to, rng) {
    if (rng != null) {
        return uniformIntInternal(from, to, rng);
    }
    return function (rng) {
        return uniformIntInternal(from, to, rng);
    };
}
exports.uniformIntDistribution = uniformIntDistribution;
