"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = void 0;
const prand = require("pure-rand");
class Random {
    constructor(internalRng) {
        this.internalRng = internalRng;
    }
    clone() {
        return new Random(this.internalRng);
    }
    uniformIn(rangeMin, rangeMax) {
        const g = prand.uniformIntDistribution(rangeMin, rangeMax, this.internalRng);
        this.internalRng = g[1];
        return g[0];
    }
    next(bits) {
        return this.uniformIn(0, (1 << bits) - 1);
    }
    nextBoolean() {
        return this.uniformIn(0, 1) === 1;
    }
    nextInt(min, max) {
        return this.uniformIn(min == null ? Random.MIN_INT : min, max == null ? Random.MAX_INT : max);
    }
    nextBigInt(min, max) {
        const g = prand.uniformBigIntDistribution(min, max, this.internalRng);
        this.internalRng = g[1];
        return g[0];
    }
    nextArrayInt(min, max) {
        const g = prand.uniformArrayIntDistribution(min, max, this.internalRng);
        this.internalRng = g[1];
        return g[0];
    }
    nextDouble() {
        const a = this.next(26);
        const b = this.next(27);
        return (a * Random.DBL_FACTOR + b) * Random.DBL_DIVISOR;
    }
}
exports.Random = Random;
Random.MIN_INT = 0x80000000 | 0;
Random.MAX_INT = 0x7fffffff | 0;
Random.DBL_FACTOR = Math.pow(2, 27);
Random.DBL_DIVISOR = Math.pow(2, -53);
