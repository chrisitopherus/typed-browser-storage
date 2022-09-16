/**
 * @jest-environment jsdom
 */
import { describe, expect, test, jest } from "@jest/globals";
import { LocalStorage } from "./boilerplate";
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
