/**
 * Function that helps identifying array types.
 * @param val Value to be checked.
 * @returns `boolean`.
 */
export function isArray<T>(val: T | T[]): val is T[] {
    if (val instanceof Array) return true;
    return false;
}