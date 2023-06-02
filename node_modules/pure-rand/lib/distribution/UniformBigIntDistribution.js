"use strict";
exports.__esModule = true;
exports.uniformBigIntDistribution = void 0;
function uniformBigIntInternal(from, diff, rng) {
    var MinRng = BigInt(rng.min());
    var NumValues = BigInt(rng.max() - rng.min() + 1);
    var FinalNumValues = NumValues;
    var NumIterations = BigInt(1);
    while (FinalNumValues < diff) {
        FinalNumValues *= NumValues;
        ++NumIterations;
    }
    var MaxAcceptedRandom = FinalNumValues - (FinalNumValues % diff);
    var nrng = rng;
    while (true) {
        var value = BigInt(0);
        for (var num = BigInt(0); num !== NumIterations; ++num) {
            var out = nrng.next();
            value = NumValues * value + (BigInt(out[0]) - MinRng);
            nrng = out[1];
        }
        if (value < MaxAcceptedRandom) {
            var inDiff = value % diff;
            return [inDiff + from, nrng];
        }
    }
}
function uniformBigIntDistribution(from, to, rng) {
    var diff = to - from + BigInt(1);
    if (rng != null) {
        return uniformBigIntInternal(from, diff, rng);
    }
    return function (rng) {
        return uniformBigIntInternal(from, diff, rng);
    };
}
exports.uniformBigIntDistribution = uniformBigIntDistribution;
