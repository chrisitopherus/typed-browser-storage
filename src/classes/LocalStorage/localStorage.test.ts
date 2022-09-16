/**
 * @jest-environment jsdom
 */

import { describe, expect, test, jest } from "@jest/globals";
import { AllStorageItems } from "../../types/general";
import { StorageItem } from "../../types/utils";
import { AbstractLocalStorage } from "./localStorage";

type LocalSotrageItems = StorageItem<"user", {
    username: string;
    gender: "female" | "male"
}> | StorageItem<"amount", number>;

class LocalStorage extends AbstractLocalStorage<LocalSotrageItems> {
    constructor() {
        super();
    }
}

// clearing the mock functions after each test
afterEach(() => {
    jest.clearAllMocks();
});

describe("Tests for successfull instanciation", () => {
    test("Instanciation", () => {
        expect(new LocalStorage()).toBeInstanceOf(LocalStorage);
        expect(new LocalStorage().get).not.toBe(undefined);
    });
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
        expect(instance.get()).toStrictEqual({ amount: null, user: null } as AllStorageItems<LocalSotrageItems>);
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
        expect(instance.get("amount")).toBe(1);
    });
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
// initItems
describe("Tests for \".initItems\" method", () => {

    test("initializes values right", () => {
        // create instance
        const instance = new LocalStorage();
        instance.initItems(null, "amount", "user");
        expect(instance.get()).toStrictEqual({ amount: null, user: null } as AllStorageItems<LocalSotrageItems>);
        instance.initItems(69, "amount");
        expect(instance.get("amount")).toBe(69);
    });

    test("Handles duplicate keys", () => {
        // create instance
        const instance = new LocalStorage();
        instance.initItems(null, "amount", "amount", "amount", "user", "user");
        expect(instance.get()).toStrictEqual({ amount: null, user: null } as AllStorageItems<LocalSotrageItems>);
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


// describe("Test for \".log\" method", () => {

// });
