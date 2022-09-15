import { describe, expect, test } from "@jest/globals";
import { isArray } from "./isArray";

// tests for the `isArray` util function

describe("Tests for isArray util function", () => {
    test("Checks if any[] is an array", () => {
        expect(isArray([])).toBe(true);
        expect(isArray([1, 2, 3, 4])).toBe(true);
        expect(isArray(["test", "for", "array"])).toBe(true);
        expect(isArray([{}, {}, {}])).toBe(true);
    });
    test("Checks if string \"\" is an array", () => {
        expect(isArray("")).toBe(false);
        expect(isArray("Hello World")).toBe(false);
    });
    test("Checks if {} is an array", () => {
        expect(isArray({})).toBe(false);
        expect(isArray({ hello: "world" })).toBe(false);
    });
    test("Checks if number is an array", () => {
        expect(isArray(0)).toBe(false);
        expect(isArray(-1)).toBe(false);
        expect(isArray(1)).toBe(false);
    });
    test("Checks if boolean is an array", () => {
        expect(isArray(true)).toBe(false);
        expect(isArray(false)).toBe(false);
    });
});