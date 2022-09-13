/**
 * Function that converts an index in case its negative.
 * @param index Index to be converted.
 * @param length Length of target array.
 * @returns Converted or non-converted index.
 * @function
 */
export function convertIndex(index: number, length: number) {
    // if index is negative -> calculate from behind
    return index < 0 ? length + index : index;
}