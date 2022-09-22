/**
 * @jest-environment jsdom
 */
import { describe, expect, test, jest } from "@jest/globals";
import { LocalStorage } from "./setup";
// clearing the mock functions after each test
afterEach(() => {
    jest.clearAllMocks();
});

describe("Tests for \".forEach\" method", () => {
    const instance = new LocalStorage();
    instance.setMany({
        amount: 69,
        user: {
            gender: "male",
            username: "Peter"
        }
    });

    function forEach(value: unknown, index: number, arr: unknown[]) {
        // do nothing
    }

    // mock it
    const mockedForEach = jest.fn(forEach);

    test("Callback function should be called for each item with all parameters", () => {
        instance.forEach(mockedForEach);
        expect(mockedForEach).toBeCalledTimes(2);
        expect(mockedForEach).toBeCalledWith(["amount", 69], 0, [["amount", 69], ["user", {
            gender: "male",
            username: "Peter"
        }]]);
        expect(mockedForEach).toBeCalledWith(["user", {
            gender: "male",
            username: "Peter"
        }], 1, [["amount", 69], ["user", {
            gender: "male",
            username: "Peter"
        }]]);
    });

    const testThis = {
        val: 0
    };
    test("This is binded correctly in the callback function", () => {
        expect(testThis.val).toBe(0);
        instance.forEach(function () {
            this.val = 1;
        }, testThis);
        expect(testThis.val).toBe(1);
    });
});