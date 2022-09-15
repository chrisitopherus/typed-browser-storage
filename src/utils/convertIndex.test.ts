import { describe, expect, test } from "@jest/globals";
import { convertIndex } from "./convertIndex";

// tests for the `convertIndex util function

describe("Tests for convertIndex util function", () => {
    test("Convert negative index in array of length 5", () => {
        expect(convertIndex(-2, 5)).toBe(3);
        expect(convertIndex(-1, 5)).toBe(4);
        expect(convertIndex(-5, 5)).toBe(0);
    });
    test("Convert positive index in array of length 5", () => {
        expect(convertIndex(1, 5)).toBe(1);
        expect(convertIndex(2, 5)).toBe(2);
        expect(convertIndex(4, 5)).toBe(4);
    });
    test("Convert index 0 in array of length 5", () => {
        expect(convertIndex(0, 5)).toBe(0);
    });
    test("Convert positive index out of range in array of length 5", () => {
        expect(convertIndex(5, 5)).toBe(5);
        expect(convertIndex(10, 5)).toBe(10);
    });
    test("Convert negative index out of range in array of length 5", () => {
        expect(convertIndex(-6, 5)).toBe(-1);
        expect(convertIndex(-10, 5)).toBe(-5);
    });

});