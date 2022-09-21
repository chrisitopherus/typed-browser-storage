import { AbstractLocalStorage } from "./classes/LocalStorage/localStorage";
import { StorageItem } from "./types/utils";

export { AbstractLocalStorage } from "./classes/LocalStorage/localStorage";

type LocalSotrageItems = StorageItem<"user", {
    username: string;
    gender: "female" | "male"
}> | StorageItem<"amount", number> | StorageItem<"testArray", number[]>;

type SessionStorageItems = StorageItem<"id", string>;

class LocalStorage extends AbstractLocalStorage<LocalSotrageItems> {
    constructor() {
        super();
    }
}

const local = new LocalStorage();

local.initItems(null, "amount", "user");


console.log(local.get());

local.setMany({
    amount: 1,
    user: {
        gender: "male",
        username: "Chris"
    }
});

console.log(local.get());

const test = local.map<{ index: number }>(function (_, i) {
    return { index: i };
});

console.log("#log with fn");
local.log(console.log, local.get());
if (local.proxyStorage) {
    local.proxyStorage.amount = 10;
    const test = local.proxyStorage.testArray;
}