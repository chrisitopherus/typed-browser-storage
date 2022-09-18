/**
 * @jest-environment jsdom
 */
import { describe, expect, test, jest } from "@jest/globals";
import { LocalStorage } from "./setup";
// clearing the mock functions after each test
afterEach(() => {
    jest.clearAllMocks();
});

describe("Tests for \".clear\" method", () => {
    const instance = new LocalStorage();
    instance.initItems(null, "amount", "user");

    test("Clearing all items", () => {
        instance.clear();
        expect(instance.get()).toStrictEqual({});
    });
});