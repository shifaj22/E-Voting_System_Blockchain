import { uniformIntDistributionInternal } from './internals/UniformIntDistributionInternal.js';
import { fromNumberToArrayInt64, substractArrayInt64 } from './internals/ArrayInt.js';
import { uniformArrayIntDistributionInternal } from './internals/UniformArrayIntDistributionInternal.js';
var sharedA = { sign: 1, data: [0, 0] };
var sharedB = { sign: 1, data: [0, 0] };
var sharedC = { sign: 1, data: [0, 0] };
var sharedData = [0, 0];
function uniformLargeIntInternal(from, to, rangeSize, rng) {
    var rangeSizeArrayIntValue = rangeSize <= Number.MAX_SAFE_INTEGER
        ? fromNumberToArrayInt64(sharedC, rangeSize)
        : substractArrayInt64(sharedC, fromNumberToArrayInt64(sharedA, to), fromNumberToArrayInt64(sharedB, from));
    if (rangeSizeArrayIntValue.data[1] === 0xffffffff) {
        rangeSizeArrayIntValue.data[0] += 1;
        rangeSizeArrayIntValue.data[1] = 0;
    }
    else {
        rangeSizeArrayIntValue.data[1] += 1;
    }
    var g = uniformArrayIntDistributionInternal(sharedData, rangeSizeArrayIntValue.data, rng);
    return [sharedData[0] * 0x100000000 + sharedData[1] + from, g[1]];
}
function uniformIntInternal(from, to, rng) {
    var rangeSize = to - from;
    if (rangeSize <= 0xffffffff) {
        var g = uniformIntDistributionInternal(rangeSize + 1, rng);
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
export { uniformIntDistribution };
