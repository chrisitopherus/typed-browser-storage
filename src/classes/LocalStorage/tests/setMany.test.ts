/**
 * @jest-environment jsdom
 */
import { describe, expect, test, jest } from "@jest/globals";
import { LocalStorage } from "./boilerplate";
// clearing the mock functions after each test
afterEach(() => {
    jest.clearAllMocks();
});

describe("Tests for \".setMany\" method", () => {
    const instance = new LocalStorage();
    test("Handling empty object", () => {
        instance.setMany({});
        expect(instance.get()).toStrictEqual({});
    });

    test("Single item is set correctly", () => {
        instance.setMany({ amount: 1 });
        expect(instance.get("amount")).toBe(1);
    });

    test("Multiple items are set correctly", () => {
        instance.setMany({ amount: 69, user: { gender: "female", username: "Marie" } });
        expect(instance.get()).toStrictEqual({ amount: 69, user: { gender: "female", username: "Marie" } });
    });

    test("Throws TypeError when no object is passed", () => {
        expect(function () {
            instance.setMany(1 as any);
        }).toThrowError(TypeError);
        expect(function () {
            instance.setMany("" as any);
        }).toThrowError(TypeError);
        expect(function () {
            instance.setMany(true as any);
        }).toThrowError(TypeError);
        expect(function () {
            instance.setMany([] as any);
        }).toThrowError(TypeError);
        expect(function () {
            instance.setMany(new Map() as any);
        }).toThrowError(TypeError);

    });
});