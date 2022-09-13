/**
 * Function that helps identifying array types.
 * @param val Value to be checked.
 * @returns `boolean`.
 * @function
 */
export function isArray<T>(val: T | T[]): val is T[] {
    return val instanceof Array ? true : false;
}