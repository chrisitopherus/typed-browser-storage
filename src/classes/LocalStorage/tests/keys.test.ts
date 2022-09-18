/**
 * @jest-environment jsdom
 */
import { describe, expect, test, jest } from "@jest/globals";
import { LocalStorage } from "./setup";
// clearing the mock functions after each test
afterEach(() => {
    jest.clearAllMocks();
});

describe("Tests for \".keys\" method", () => {
    const instance = new LocalStorage();
    instance.initItems(null, "amount", "user");
    test("Getting keys", () => {
        expect(instance.keys()).toStrictEqual(["amount", "user"]);
    });
});