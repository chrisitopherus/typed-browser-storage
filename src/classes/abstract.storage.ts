import { AllStorageItems, FunctionTypes, StorageItemMap } from "../types/general";
import { GetStorageItemDataByName, StorageItem } from "../types/utils";
import { convertIndex } from "../utils/convertIndex";
import { EventEmitter } from "./eventEmitter";

export abstract class AbstractStorage<StorageItems extends StorageItem<any, unknown>> {

    /**
     * Property containing the storage that is being used.
     * @protected
     */
    protected _storage: Storage;

    /**
     * Property containing the parser function that is being used for parsing.
     * @protected
     */
    protected _parser: FunctionTypes["ParserFunction"] = this.parserFunction;

    /**
     * Property containing the stringifier function that is being used for stringifying
     * @protected
     */
    protected _stringifier: FunctionTypes["StringifierFunction"] = this.stringifierFunction;

    /**
     * Property containing the event emitter that is being used.
     * @protected
     */
    protected _eventEmitter = new EventEmitter();

    constructor(windowObj: Window, storage: Storage) {
        // do nothing
        this._storage = storage;
        // add listener
        windowObj.addEventListener("storage", this.storageEventHandler);
    }

    /**
     * Method for handling the storage event on the window object.
     * @param event The Storage event.
     * @private
     */
    private storageEventHandler = (event: StorageEvent) => {
        console.dir(event);

        // emitting the storage event
        this._eventEmitter.emit("storage", event);
    };

    /**
     * Parser method. Simple usage of `JSON.parse`.
     * @param data Data to be parsed.
     * @returns Parsed data.
     * @private
     */
    private parserFunction(data: string) {
        return JSON.parse(data);
    }

    /**
     * Stringifier method. Simple usage of `JSON.stringify`.
     * @param data Data to be stringified.
     * @returns Stringified data.
     * @private
     */
    private stringifierFunction(data: unknown) {
        return JSON.stringify(data);
    }

    /**
     * Method for setting a new parser function.
     * @param parserFn Function that parses strings from the storage.
     * @public
     */
    public setParser(parserFn: FunctionTypes["ParserFunction"]) {
        this._parser = parserFn;
    }

    /**
     * Method for resetting the parser function to the default one.
     * @public
     */
    public resetParser() {
        this._parser = this.parserFunction;
    }

    /**
     * Method for setting a new stringifier function.
     * @param stringifierFn Function that stringifies data for the storage.
     * @public
     */
    public setStringifier(stringifierFn: FunctionTypes["StringifierFunction"]) {
        this._stringifier = stringifierFn;
    }

    /**
     * Method for resetting the stringifier function to the default one.
     * @public
     */
    public resetStringifier() {
        this._stringifier = this.stringifierFunction;
    }

    /**
     * Method for initializing the items with a given value.
     * @param val Value to initialize with.
     * @param items Array of item keys.
     * @returns Returns the instance for chaining.
     * @public
     */
    public initItems(val: unknown, ...items: StorageItems["name"][]) {
        // looping thorugh arg list
        for (let i = 0; i < items.length; ++i) {
            try {
                const stringified = this._stringifier(val);
                // initialize key with value
                this._storage.setItem(items[i], stringified);
            } catch (error) {
                console.error(`Something went wrong while parsing the value "${val}" ...`);
            }
        }
        return this;
    }

    /**
     * Method for getting items from the local storage.
     * @param item Item name. If no item name is provided all items will be returned.
     * @returns One or more items from the local storage.
     * @public
     */
    public get<ItemName extends StorageItems["name"], ReturnData = GetStorageItemDataByName<ItemName, StorageItems>>(item: ItemName): ReturnData | null
    public get(item?: undefined): AllStorageItems<StorageItems>
    public get<ItemName extends StorageItems["name"], ReturnData = GetStorageItemDataByName<ItemName, StorageItems>>(item?: ItemName) {
        if (item) { // try to get item

            const storeItem = this._storage.getItem(item);

            // if no item found -> return `null`
            if (!storeItem) return null;

            try {
                // try parsing item
                return this._parser(storeItem) as ReturnData;

            } catch (error) {
                console.error(`Something went wrong while parsing the item "${storeItem}" ...`);
                // something went wrong -> return `null`
                return null;
            }


        } else { // get all items

            const storage: AllStorageItems<StorageItems> = {};

            // loop through keys of storage
            for (let i = 0; i < this._storage.length; ++i) {
                // get key
                const key = this._storage.key(i) as StorageItems["name"]; //? can be certain that it will exist since we iterate through the length

                // get item
                const storeItem = this._storage.getItem(key) as string; //? can be certain that it will exist since we have the key

                // parse item
                try {
                    const parsedItem = this._parser(storeItem) as GetStorageItemDataByName<typeof key, StorageItems>;

                    // store it in local variable
                    storage[key] = parsedItem;
                } catch (error) {
                    console.error(`Something went wrong while parsing the item "${storeItem}" ...`);
                    storage[key] = null;
                }

            }

            return storage;
        }
    }

    /**
     * Method for setting an item.
     * @param item Name of the item.
     * @param data Data of the item.
     * @returns Returns the instance for chaining.
     * @public
     */
    public set<ItemName extends StorageItems["name"]>(item: ItemName, data: GetStorageItemDataByName<ItemName, StorageItems>) {
        try {
            // try to stringify data
            const stringifiedData = this._stringifier(data);

            // setting data
            this._storage.setItem(item, stringifiedData);
        } catch (error) {
            console.error(`Something went wrong while stringifying the item "${data}" ...`);
        }
        return this;
    }

    /**
     * Method for setting many items.
     * @param items Object or Map to set storage items with data.
     * @returns Returns the instance for chaining.
     * @public
     */
    public setMany(items: StorageItemMap<StorageItems>) {
        const itemKeyArr = Object.keys(items);
        for (let i = 0; i < itemKeyArr.length; ++i) {
            const item = itemKeyArr[i] as StorageItems["name"];
            const data = items[item];
            try {
                // try to stringify data
                const stringifiedData = this._stringifier(data);

                // setting data
                this._storage.setItem(item, stringifiedData);
            } catch (error) {
                console.error(`Something went wrong while stringifying the item "${data}" ...`);
            }
        }
        return this;
    }

    /**
     * Method for removing one or more items.
     * @param items Items to be removed.
     * @returns Returns the instance for chaining.
     * @public
     */
    public remove(...items: StorageItems["name"]) {
        // iterate through given item names
        for (let i = 0; i < items.length; ++i) {
            // remove item
            this._storage.removeItem(items[i]);
        }
        return this;
    }

    /**
     * Method for clearing all items from the storage.
     * @public
     */
    public clear() {
        this._storage.clear();
    }

    /**
     * Method for getting the name of the nth key or `null` if n is out of range.
     * @param n Index of key.
     * @returns Name of key at position `n` or `null`.
     * @public
     */
    public key(n: number) {
        return this._storage.key(n);
    }

    /**
     * Method for getting the length of the storage.
     * @returns Length of the storage.
     * @public
     */
    public length() {
        return this._storage.length;
    }

    /**
     * Takes an integer value and returns the item at that index in the storage, allowing for positive and negative integers. Negative integers count back from the last item in the storage.
     * @param index Index.
     * @param parse Wether to parse the value or not. If parsing fails -> unparsed value is returned.
     * @returns Value at the given index or `undefined`.
     * @public
     * 
     * ? `For Typescript-users:` You can define the expected return type through a generic type parameter.
     */
    public at<ExpectedReturnType = unknown>(index: number, parse?: boolean) {
        // convert index if negative and also removing any fractional part 
        const convertedIndex = convertIndex(Math.trunc(index), this.length());
        // get key at index
        const key = this.key(convertedIndex);
        // if no key at index -> return undefined
        if (!key) return undefined;
        // get value of key
        const value = this._storage[key];
        // check if parsing is wanted
        let returnVal = value;
        try {
            if (parse) returnVal = this._parser(returnVal);
        } catch (error) {
            console.error(`Something went wrong while parsing the item "${value}" ...`);
            return value;
        }
        return returnVal as ExpectedReturnType;
    }
}

//? ideas / added:
//* .at - check
//* .map
//* .forEach
//* .filter