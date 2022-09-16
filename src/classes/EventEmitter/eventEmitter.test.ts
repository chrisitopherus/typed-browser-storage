import { describe, expect, test, jest } from "@jest/globals";
import EventEmitter from "./eventEmitter";

// tests for the `EventEmitter` class

// clearing the mock functions after each test
afterEach(() => {
    jest.clearAllMocks();
});

describe("Tests EventEmitter class", () => {
    const emitter = new EventEmitter();
    const handler1 = jest.fn();

    test("Adding Event handler for \"test\" with the .on method and checking if added to the storage", () => {
        // adding event handler for "test" event
        emitter.on("test", handler1);
        expect(emitter.storage["test"]).not.toBe(undefined);
        expect(emitter.storage["test"].length).toBe(1);
    });

    test("Emit \"test\" event and check if handler is called", () => {
        // firing event
        emitter.emit("test", "hello");
        expect(handler1).toBeCalled();
    });

    test("Adding another event handler for \"test\" with the .on method", () => {
        // adding event handler for "test" event
        emitter.on("test", handler1);

        expect(emitter.storage["test"]).not.toBe(undefined);
        expect(emitter.storage["test"].length).toBe(2);
    });

    test("Emit \"test\" again to check if both handlers are called", () => {
        // firing event
        emitter.emit("test", "hello");
        expect(handler1).toBeCalledTimes(2);
    });

    test("Emit \"test\" with data to check if handlers are called with it", () => {
        // firing event
        emitter.emit("test", "hello");
        expect(handler1).toBeCalledTimes(2);
        expect(handler1).toHaveBeenCalledWith("hello");
    });

    test("Checks if clearing with the .clear method clears event storage", () => {
        // clear
        emitter.clear();
        expect(emitter.storage).toStrictEqual({});
    });
});