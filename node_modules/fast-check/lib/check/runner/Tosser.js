"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toss = void 0;
const prand = require("pure-rand");
const Random_1 = require("../../random/generator/Random");
const Shrinkable_1 = require("../arbitrary/definition/Shrinkable");
function lazyGenerate(generator, rng, idx) {
    return () => generator.generate(new Random_1.Random(rng), idx);
}
function* toss(generator, seed, random, examples) {
    yield* examples.map((e) => () => new Shrinkable_1.Shrinkable(e));
    let idx = 0;
    let rng = random(seed);
    for (;;) {
        rng = rng.jump ? rng.jump() : prand.skipN(rng, 42);
        yield lazyGenerate(generator, rng, idx++);
    }
}
exports.toss = toss;
