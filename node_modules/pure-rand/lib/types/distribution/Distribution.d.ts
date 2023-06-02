import { RandomGenerator } from '../generator/RandomGenerator';
declare type Distribution<T> = (rng: RandomGenerator) => [T, RandomGenerator];
export default Distribution;
export { Distribution };
