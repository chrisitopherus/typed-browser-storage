/**
 * @jest-environment jsdom
 */
import { describe, expect, test, jest } from "@jest/globals";
import { LocalStorage } from "./boilerplate";
// clearing the mock functions after each test
afterEach(() => {
    jest.clearAllMocks();
});

describe("Tests for \".setStringifier\" method", () => {
    // recreate built in stringifier function
    const stringifierFn = function (data: unknown) {
        return JSON.stringify(data);
    };

    // mock it
    const mockedStringifier = jest.fn(stringifierFn);

    // create instance
    const instance = new LocalStorage();
    // init some items
    instance.initItems(null, "user", "amount");

    // set stringifier function
    instance.setStringifier(mockedStringifier);

    test("New Stringifier function was set", () => {
        // stringifer is called during setting items
        instance.set("amount", 1);
        expect(mockedStringifier).toBeCalled();
    });

    test("Stringifier function stringifies items as defined", () => {
        expect(instance.get("amount")).toBe(1);
    });

    test("Throws TypeError when no function is passed", () => {
        expect(function () {
            // call the method with no function as arg
            instance.setStringifier(undefined as any);
        }).toThrow(TypeError);
    });
});