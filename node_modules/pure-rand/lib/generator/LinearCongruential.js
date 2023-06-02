"use strict";
exports.__esModule = true;
exports.congruential32 = exports.congruential = void 0;
var MULTIPLIER = 0x000343fd;
var INCREMENT = 0x00269ec3;
var MASK = 0xffffffff;
var MASK_2 = (1 << 31) - 1;
var computeNextSeed = function (seed) {
    return (seed * MULTIPLIER + INCREMENT) & MASK;
};
var computeValueFromNextSeed = function (nextseed) {
    return (nextseed & MASK_2) >> 16;
};
var LinearCongruential = (function () {
    function LinearCongruential(seed) {
        this.seed = seed;
    }
    LinearCongruential.prototype.min = function () {
        return LinearCongruential.min;
    };
    LinearCongruential.prototype.max = function () {
        return LinearCongruential.max;
    };
    LinearCongruential.prototype.next = function () {
        var nextseed = computeNextSeed(this.seed);
        return [computeValueFromNextSeed(nextseed), new LinearCongruential(nextseed)];
    };
    LinearCongruential.min = 0;
    LinearCongruential.max = Math.pow(2, 15) - 1;
    return LinearCongruential;
}());
var LinearCongruential32 = (function () {
    function LinearCongruential32(seed) {
        this.seed = seed;
    }
    LinearCongruential32.prototype.min = function () {
        return LinearCongruential32.min;
    };
    LinearCongruential32.prototype.max = function () {
        return LinearCongruential32.max;
    };
    LinearCongruential32.prototype.next = function () {
        var s1 = computeNextSeed(this.seed);
        var v1 = computeValueFromNextSeed(s1);
        var s2 = computeNextSeed(s1);
        var v2 = computeValueFromNextSeed(s2);
        var s3 = computeNextSeed(s2);
        var v3 = computeValueFromNextSeed(s3);
        var vnext = v3 + ((v2 + (v1 << 15)) << 15);
        return [((vnext + 0x80000000) | 0) + 0x80000000, new LinearCongruential32(s3)];
    };
    LinearCongruential32.min = 0;
    LinearCongruential32.max = 0xffffffff;
    return LinearCongruential32;
}());
var congruential = function (seed) {
    return new LinearCongruential(seed);
};
exports.congruential = congruential;
var congruential32 = function (seed) {
    return new LinearCongruential32(seed);
};
exports.congruential32 = congruential32;
