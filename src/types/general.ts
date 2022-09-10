import { GetStorageItemDataByName, StorageItem } from "./utils";
export interface FunctionTypes {
    ParserFunction: <ParsedData>(data: string) => ParsedData;
    StringifierFunction: <Data>(data: Data) => string;
}

export type AllStorageItems<Items extends StorageItem<any, any>> = {
    [P in Items["name"]]?: GetStorageItemDataByName<P, Items> | null | undefined
};