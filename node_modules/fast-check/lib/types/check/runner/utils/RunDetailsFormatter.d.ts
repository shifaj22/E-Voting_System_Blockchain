import { RunDetails } from '../reporter/RunDetails';
/**
 * Format output of {@link check} using the default error reporting of {@link assert}
 *
 * Produce a string containing the formated error in case of failed run,
 * undefined otherwise.
 *
 * @remarks Since 1.25.0
 * @public
 */
declare function defaultReportMessage<Ts>(out: RunDetails<Ts> & {
    failed: false;
}): undefined;
/**
 * Format output of {@link check} using the default error reporting of {@link assert}
 *
 * Produce a string containing the formated error in case of failed run,
 * undefined otherwise.
 *
 * @remarks Since 1.25.0
 * @public
 */
declare function defaultReportMessage<Ts>(out: RunDetails<Ts> & {
    failed: true;
}): string;
/**
 * Format output of {@link check} using the default error reporting of {@link assert}
 *
 * Produce a string containing the formated error in case of failed run,
 * undefined otherwise.
 *
 * @remarks Since 1.25.0
 * @public
 */
declare function defaultReportMessage<Ts>(out: RunDetails<Ts>): string | undefined;
export { defaultReportMessage };
