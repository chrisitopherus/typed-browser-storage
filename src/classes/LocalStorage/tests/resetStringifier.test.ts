/**
 * @jest-environment jsdom
 */
import { describe, expect, test, jest } from "@jest/globals";
import { LocalStorage } from "./boilerplate";
// clearing the mock functions after each test
afterEach(() => {
    jest.clearAllMocks();
});

describe("Tests for \".resetStringifier\" method", () => {
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

    // reset it
    instance.resetStringifier();
    test("Stringifier function is being reset to built in function", () => {
        instance.set("amount", 2);
        expect(mockedStringifier).not.toBeCalled();
        expect(instance.get("amount")).toBe(2);
    });
});