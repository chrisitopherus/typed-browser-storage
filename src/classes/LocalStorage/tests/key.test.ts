/**
 * @jest-environment jsdom
 */
import { describe, expect, test, jest } from "@jest/globals";
import { LocalStorage } from "./boilerplate";
// clearing the mock functions after each test
afterEach(() => {
    jest.clearAllMocks();
});

describe("Tests for \".key\" method", () => {
    const instance = new LocalStorage();
    instance.initItems(null, "amount", "user");
    test("Getting key of in range index", () => {
        expect(instance.key(0)).toBe("amount");
        expect(instance.key(1)).toBe("user");
    });

    test("Getting key of out of range index should return null", () => {
        expect(instance.key(2)).toBe(null);
    });
});