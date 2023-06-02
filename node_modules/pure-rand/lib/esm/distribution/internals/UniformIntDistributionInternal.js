export function uniformIntDistributionInternal(rangeSize, rng) {
    var MinRng = rng.min();
    var NumValues = rng.max() - rng.min() + 1;
    if (rangeSize <= NumValues) {
        var nrng_1 = rng;
        var MaxAllowed = NumValues - (NumValues % rangeSize);
        while (true) {
            var out = nrng_1.next();
            var deltaV = out[0] - MinRng;
            nrng_1 = out[1];
            if (deltaV < MaxAllowed) {
                return [deltaV % rangeSize, nrng_1];
            }
        }
    }
    var FinalNumValues = NumValues * NumValues;
    var NumIterations = 2;
    while (FinalNumValues < rangeSize) {
        FinalNumValues *= NumValues;
        ++NumIterations;
    }
    var MaxAcceptedRandom = rangeSize * Math.floor((1 * FinalNumValues) / rangeSize);
    var nrng = rng;
    while (true) {
        var value = 0;
        for (var num = 0; num !== NumIterations; ++num) {
            var out = nrng.next();
            value = NumValues * value + (out[0] - MinRng);
            nrng = out[1];
        }
        if (value < MaxAcceptedRandom) {
            var inDiff = value - rangeSize * Math.floor((1 * value) / rangeSize);
            return [inDiff, nrng];
        }
    }
}
