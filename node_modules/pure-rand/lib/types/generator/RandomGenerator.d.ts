export default interface RandomGenerator {
    next(): [number, RandomGenerator];
    jump?(): RandomGenerator;
    min(): number;
    max(): number;
}
declare function generateN(rng: RandomGenerator, num: number): [number[], RandomGenerator];
declare function skipN(rng: RandomGenerator, num: number): RandomGenerator;
export { RandomGenerator, generateN, skipN };
