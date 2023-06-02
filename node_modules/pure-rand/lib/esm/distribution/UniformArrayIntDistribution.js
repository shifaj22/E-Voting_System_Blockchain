import { addArrayIntToNew, addOneToPositiveArrayInt, substractArrayIntToNew, trimArrayIntInplace, } from './internals/ArrayInt.js';
import { uniformArrayIntDistributionInternal } from './internals/UniformArrayIntDistributionInternal.js';
function uniformArrayIntInternal(from, to, rng) {
    var rangeSize = trimArrayIntInplace(addOneToPositiveArrayInt(substractArrayIntToNew(to, from)));
    var emptyArrayIntData = rangeSize.data.slice(0);
    var g = uniformArrayIntDistributionInternal(emptyArrayIntData, rangeSize.data, rng);
    return [trimArrayIntInplace(addArrayIntToNew({ sign: 1, data: g[0] }, from)), g[1]];
}
function uniformArrayIntDistribution(from, to, rng) {
    if (rng != null) {
        return uniformArrayIntInternal(from, to, rng);
    }
    return function (rng) {
        return uniformArrayIntInternal(from, to, rng);
    };
}
export { uniformArrayIntDistribution };
