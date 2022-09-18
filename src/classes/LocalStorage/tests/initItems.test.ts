/**
 * @jest-environment jsdom
 */
import { describe, expect, test, jest } from "@jest/globals";
import { AllStorageItems } from "../../../types/general";
import { LocalSotrageItemsTest, LocalStorage } from "./setup";
// clearing the mock functions after each test
afterEach(() => {
    jest.clearAllMocks();
});

describe("Tests for \".initItems\" method", () => {

    test("initializes values right", () => {
        // create instance
        const instance = new LocalStorage();
        instance.initItems(null, "amount", "user");
        expect(instance.get()).toStrictEqual({ amount: null, user: null } as AllStorageItems<LocalSotrageItemsTest>);
        instance.initItems(69, "amount");
        expect(instance.get("amount")).toBe(69);
    });

    test("Handles duplicate keys", () => {
        // create instance
        const instance = new LocalStorage();
        instance.initItems(null, "amount", "amount", "amount", "user", "user");
        expect(instance.get()).toStrictEqual({ amount: null, user: null } as AllStorageItems<LocalSotrageItemsTest>);
    });

    //! THIS TEST MAY BE PLACED AT THE GET() TESTS
    test("If stringifier not able to stringify then item will be skipped", () => {
        // create instance
        const instance = new LocalStorage();
        // clear localStorage
        instance.clear();
        // creating obj which will throw error while stringifiying
        const obj = {
            prop: "" as any
        };
        obj.prop = obj;

        instance.initItems(obj, "user");
        expect(instance.get()).toStrictEqual({});
    });
});