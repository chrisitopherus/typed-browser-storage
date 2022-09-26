/**
 * @jest-environment jsdom
 */
import { describe, expect, test, jest } from "@jest/globals";
import { LocalStorage } from "./setup";
// clearing the mock functions after each test
afterEach(() => {
    jest.clearAllMocks();
});

describe("Tests for \".indexOf\" method", () => {
    const instance = new LocalStorage();
    instance.initItems(null, "amount", "user");

    test("Returns right index of item", () => {
        expect(instance.indexOf("amount")).toBe(0);
        expect(instance.indexOf("user")).toBe(1);
    });

    test("Not existing item returns -1", () => {
        expect(instance.indexOf("test" as any)).toBe(-1);
    });
});