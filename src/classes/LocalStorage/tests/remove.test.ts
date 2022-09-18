/**
 * @jest-environment jsdom
 */
import { describe, expect, test, jest } from "@jest/globals";
import { LocalStorage } from "./boilerplate";
// clearing the mock functions after each test
afterEach(() => {
    jest.clearAllMocks();
});

describe("Tests for \".remove\" method", () => {
    const instance = new LocalStorage();
    instance.initItems(null, "amount", "user");

    test("1 Item is removed correctly", () => {
        instance.remove("amount");
        expect(instance.get("amount")).toBe(undefined);
    });

    test("Multiple items are removed correctly", () => {
        instance.set("amount", 1);
        instance.remove("amount", "user");
        expect(instance.get("amount")).toBe(undefined);
        expect(instance.get("user")).toBe(undefined);
    });

    test("Removing not existing item should not throw an error", () => {
        expect(function () {
            instance.remove("test" as any);
        }).not.toThrow();
    });
});