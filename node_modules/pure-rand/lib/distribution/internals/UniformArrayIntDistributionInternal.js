"use strict";
exports.__esModule = true;
exports.uniformArrayIntDistributionInternal = void 0;
var UniformIntDistributionInternal_1 = require("./UniformIntDistributionInternal");
function uniformArrayIntDistributionInternal(out, rangeSize, rng) {
    var rangeLength = rangeSize.length;
    var nrng = rng;
    while (true) {
        for (var index = 0; index !== rangeLength; ++index) {
            var indexRangeSize = index === 0 ? rangeSize[0] + 1 : 0x100000000;
            var g = UniformIntDistributionInternal_1.uniformIntDistributionInternal(indexRangeSize, nrng);
            out[index] = g[0];
            nrng = g[1];
        }
        for (var index = 0; index !== rangeLength; ++index) {
            var current = out[index];
            var currentInRange = rangeSize[index];
            if (current < currentInRange) {
                return [out, nrng];
            }
            else if (current > currentInRange) {
                break;
            }
        }
    }
}
exports.uniformArrayIntDistributionInternal = uniformArrayIntDistributionInternal;
