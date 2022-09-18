/**
 * @jest-environment jsdom
 */
import { describe, expect, test, jest } from "@jest/globals";
import { LocalStorage } from "./setup";
// clearing the mock functions after each test
afterEach(() => {
    jest.clearAllMocks();
});

describe("Tests for \".log\" method", () => {
    const mockedLogger = jest.fn();
    // create instance
    const instance = new LocalStorage();
    test("Given logger function is called", () => {
        // call logger function
        instance.log(mockedLogger, "");
        expect(mockedLogger).toBeCalled();
    });

    test("Specified data is passed to logger function", () => {
        // call logger function
        instance.log(mockedLogger, 1);
        expect(mockedLogger).toHaveBeenLastCalledWith(1);
        // call logger function
        instance.log(mockedLogger, "test");
        expect(mockedLogger).toHaveBeenLastCalledWith("test");
        // call logger function
        instance.log(mockedLogger, { test: 69 });
        expect(mockedLogger).toHaveBeenLastCalledWith({ test: 69 });
    });

    test("Throws TypeError when no function is passed", () => {
        expect(function () {
            // call the method with no function as arg
            instance.log(undefined as any, "");
        }).toThrow(TypeError);
    });
});