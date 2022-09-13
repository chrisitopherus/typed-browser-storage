import { AbstractLocalStorage } from "./classes/LocalStorage/localStorage";
import { StorageItem } from "./types/utils";

export { AbstractLocalStorage } from "./classes/LocalStorage/localStorage";

type LocalSotrageItems = StorageItem<"user", {
    username: string;
    gender: "female" | "male"
}> | StorageItem<"amount", number>;

type SessionStorageItems = StorageItem<"id", string>;

class LocalStorage extends AbstractLocalStorage<LocalSotrageItems> {
    constructor() {
        super();
    }
}

const local = new LocalStorage();

local.initItems(null, "amount", "user");

const test = local.get();

console.log(test);

local.setMany({
    amount: 1,
    user: {
        gender: "male",
        username: "Chris"
    }
});