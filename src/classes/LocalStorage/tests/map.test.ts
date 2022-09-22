/**
 * @jest-environment jsdom
 */
import { describe, expect, test, jest } from "@jest/globals";
import { LocalSotrageItemsTest, LocalStorage } from "./setup";
import { GetStorageItemDataByName } from "../../../types/utils";
// clearing the mock functions after each test
afterEach(() => {
    jest.clearAllMocks();
});

describe("Tests for \".map\" method", () => {
    const instance = new LocalStorage();
    instance.setMany({
        amount: 69,
        user: {
            gender: "male",
            username: "Peter"
        }
    });

    function map(value: unknown, index: number, arr: unknown[]) {
        // do nothing
    }

    // mock it
    const mockedMap = jest.fn(map);

    test("Callback function should be called for each item with all parameters", () => {
        instance.forEach(mockedMap);
        expect(mockedMap).toBeCalledTimes(2);
        expect(mockedMap).toBeCalledWith(["amount", 69], 0, [["amount", 69], ["user", {
            gender: "male",
            username: "Peter"
        }]]);
        expect(mockedMap).toBeCalledWith(["user", {
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

    test("Returns the mapped aray correctly", () => {
        expect(instance.map(function (val, i, arr) {
            if (val[0] === "amount") {
                return val[1] as GetStorageItemDataByName<"amount", LocalSotrageItemsTest> + 10;
            } else {
                (val[1] as GetStorageItemDataByName<"user", LocalSotrageItemsTest>).gender = "female";
                return val[1];
            }
        })).toStrictEqual([79, { gender: "female", username: "Peter" }]);

        expect(instance.map(function (val, i, arr) {
            return i;
        })).toStrictEqual([0, 1]);
    });

});