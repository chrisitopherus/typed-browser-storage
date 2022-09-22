/**
 * @jest-environment jsdom
 */
import { describe, expect, test, jest } from "@jest/globals";
import { LocalStorage } from "./setup";
// clearing the mock functions after each test
afterEach(() => {
    jest.clearAllMocks();
});

describe("Tests for \".at\" method", () => {
    const instance = new LocalStorage();
    instance.setMany({
        amount: 69,
        user: {
            gender: "male",
            username: "Peter"
        }
    });

    test("Using positive index in range should return parsed data", () => {
        expect(instance.at(0, true)).toBe(69);
        expect(instance.at(1, true)).toStrictEqual({
            gender: "male",
            username: "Peter"
        });
    });

    test("Using negative index in range should return parsed data", () => {
        expect(instance.at(-2, true)).toBe(69);
        expect(instance.at(-1, true)).toStrictEqual({
            gender: "male",
            username: "Peter"
        });
    });

    test("Using positive index out of range should return undefined", () => {
        expect(instance.at(2)).toBe(undefined);
    });

    test("Using negative index out of range should return undefined", () => {
        expect(instance.at(-3)).toBe(undefined);
    });

    test("Using index in range should not return parsed data", () => {
        expect(instance.at(0)).toBe("69");
        expect(instance.at(1)).toBe(JSON.stringify({
            gender: "male",
            username: "Peter"
        }));
    });
});