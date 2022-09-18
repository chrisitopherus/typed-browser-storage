import { StorageItem } from "../../../types/utils";
import { AbstractLocalStorage } from "../localStorage";

export type LocalSotrageItemsTest = StorageItem<"user", {
    username: string;
    gender: "female" | "male"
}> | StorageItem<"amount", number>;

export class LocalStorage extends AbstractLocalStorage<LocalSotrageItemsTest> {
    constructor() {
        super();
    }
}