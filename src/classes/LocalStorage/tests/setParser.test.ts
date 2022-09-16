/**
 * @jest-environment jsdom
 */
import { describe, expect, test, jest } from "@jest/globals";
import { AllStorageItems } from "../../../types/general";
import { LocalStorage, LocalSotrageItemsTest } from "./boilerplate";
// clearing the mock functions after each test
afterEach(() => {
    jest.clearAllMocks();
});

describe("Tests for \".setParser\" method", () => {
    // recreate built in parser function
    const parserFn = function (data: string) {
        return JSON.parse(data);
    };

    // mock it
    const mockedParser = jest.fn(parserFn);

    // create instance
    const instance = new LocalStorage();
    // init some items
    instance.initItems(null, "user", "amount");

    // set parser function
    instance.setParser(mockedParser);

    test("New Parser function was set", () => {
        // call .get() since it uses the current parser fucnction so we can check if its being used.
        instance.get();
        expect(mockedParser).toBeCalled();
    });

    test("Parser function parses items as defined", () => {
        expect(instance.get()).toStrictEqual({ amount: null, user: null } as AllStorageItems<LocalSotrageItemsTest>);
        // change amount prop in storage
        instance.set("amount", 1);
        expect(instance.get("amount")).toBe(1);
    });

    test("Throws TypeError when no function is passed", () => {
        expect(function () {
            // call the method with no function as arg
            instance.setParser(undefined as any);
        }).toThrow(TypeError);
    });
});