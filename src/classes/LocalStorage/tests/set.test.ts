/**
 * @jest-environment jsdom
 */
import { describe, expect, test, jest } from "@jest/globals";
import { LocalStorage } from "./setup";
// clearing the mock functions after each test
afterEach(() => {
    jest.clearAllMocks();
});

describe("Tests for \".set\" method", () => {
    const instance = new LocalStorage();

    test("Items are being set in the storage", () => {
        instance.set("amount", 27);
        expect(instance.get("amount")).toBe(27);
        instance.set("amount", 69);
        expect(instance.get("amount")).toBe(69);
    });
});