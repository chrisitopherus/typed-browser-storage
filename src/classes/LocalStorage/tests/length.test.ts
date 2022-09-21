/**
 * @jest-environment jsdom
 */
import { describe, expect, test, jest } from "@jest/globals";
import { LocalStorage } from "./setup";
// clearing the mock functions after each test
afterEach(() => {
    jest.clearAllMocks();
});

describe("Tests for \".length\" method", () => {
    const instance = new LocalStorage();
    instance.initItems(null, "amount", "user");
    test("Getting the length", () => {
        expect(instance.length()).toBe(2);
        instance.clear();
        expect(instance.length()).toBe(0);
    });
});