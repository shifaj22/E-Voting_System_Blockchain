import * as prand from 'pure-rand';
import { Random } from '../../random/generator/Random.js';
import { Shrinkable } from '../arbitrary/definition/Shrinkable.js';
function lazyGenerate(generator, rng, idx) {
    return () => generator.generate(new Random(rng), idx);
}
export function* toss(generator, seed, random, examples) {
    yield* examples.map((e) => () => new Shrinkable(e));
    let idx = 0;
    let rng = random(seed);
    for (;;) {
        rng = rng.jump ? rng.jump() : prand.skipN(rng, 42);
        yield lazyGenerate(generator, rng, idx++);
    }
}
