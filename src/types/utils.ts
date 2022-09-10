/**
 * Interface for creating StorageItems.
 * @interface
 */
export interface StorageItem<Name extends string, Data> {
    name: Name;
    data: Data
}

export type GetStorageItemByName<Item extends string, T, Key = undefined> =
    Key extends string | number | symbol
    ? T extends {
        [key: string | number | symbol]: unknown, name: Item, Key: unknown
    } ? T[Key] : never
    : T extends { name: Item } ? T : never;

export type GetStorageItemDataByName<Item extends string, T> = T extends { name: Item, data: unknown } ? T["data"] : never;

export type StorageItemTuple<StorageItemName extends string, T> = [StorageItemName, GetStorageItemDataByName<StorageItemName, T>];