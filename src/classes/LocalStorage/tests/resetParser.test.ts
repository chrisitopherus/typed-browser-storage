/**
 * @jest-environment jsdom
 */
import { describe, expect, test, jest } from "@jest/globals";
import { LocalStorage } from "./boilerplate";
// clearing the mock functions after each test
afterEach(() => {
    jest.clearAllMocks();
});

describe("Tests for \".resetParser\" method", () => {
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

    // reset it
    instance.resetParser();
    test("Parser function is being reset to built in function", () => {
        expect(mockedParser).not.toBeCalled();
        expect(instance.get("amount")).toBe(null);
    });
});