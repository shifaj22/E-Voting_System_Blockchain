"use strict";
exports.__esModule = true;
exports.uniformArrayIntDistribution = void 0;
var ArrayInt_1 = require("./internals/ArrayInt");
var UniformArrayIntDistributionInternal_1 = require("./internals/UniformArrayIntDistributionInternal");
function uniformArrayIntInternal(from, to, rng) {
    var rangeSize = ArrayInt_1.trimArrayIntInplace(ArrayInt_1.addOneToPositiveArrayInt(ArrayInt_1.substractArrayIntToNew(to, from)));
    var emptyArrayIntData = rangeSize.data.slice(0);
    var g = UniformArrayIntDistributionInternal_1.uniformArrayIntDistributionInternal(emptyArrayIntData, rangeSize.data, rng);
    return [ArrayInt_1.trimArrayIntInplace(ArrayInt_1.addArrayIntToNew({ sign: 1, data: g[0] }, from)), g[1]];
}
function uniformArrayIntDistribution(from, to, rng) {
    if (rng != null) {
        return uniformArrayIntInternal(from, to, rng);
    }
    return function (rng) {
        return uniformArrayIntInternal(from, to, rng);
    };
}
exports.uniformArrayIntDistribution = uniformArrayIntDistribution;
