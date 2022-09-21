import { GetStorageItemDataByName, StorageItem } from "./utils";
export interface FunctionTypes {
    ParserFunction: <ParsedData>(data: string) => ParsedData;
    StringifierFunction: <Data>(data: Data) => string;
}

export type AllStorageItems<Items extends StorageItem<string, unknown>> = {
    [P in Items["name"]]?: GetStorageItemDataByName<P, Items> | null | undefined
};

export type ProxyObject<Items extends StorageItem<string, unknown>> = {
    [P in Items["name"]]: GetStorageItemDataByName<P, Items> | undefined
}

export type StorageItemMap<Items extends StorageItem<string, unknown>> = {
    [P in Items["name"]]?: GetStorageItemDataByName<P, Items>
}
