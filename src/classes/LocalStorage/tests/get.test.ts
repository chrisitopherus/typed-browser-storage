/**
 * @jest-environment jsdom
 */
import { describe, expect, test, jest } from "@jest/globals";
import { LocalStorage } from "./boilerplate";
// clearing the mock functions after each test
afterEach(() => {
    jest.clearAllMocks();
});

describe("Tests for \".get\" method", () => {
    // create instance
    const instance = new LocalStorage();
    instance.setMany({
        amount: 69,
        user: {
            gender: "male",
            username: "Peter"
        }
    });
    test("Trying to get item which doesn't exist -> return undefined", () => {
        // test does not exist in storage
        expect(instance.get("test" as any)).toBe(undefined);
    });

    test("Trying to get all items in storage", () => {
        expect(instance.get()).toStrictEqual({ amount: 69, user: { gender: "male", username: "Peter" } });
        // clear storage
        instance.clear();
        expect(instance.get()).toStrictEqual({});
    });

    test("Trying to get exisitng item", () => {
        instance.set("amount", 69);
        instance.initItems(null, "user");
        expect(instance.get("amount")).toBe(69);
        expect(instance.get("user")).toBe(null);
    });
});