import { AbstractStorage } from "../classes/abstract.storage";
import { StorageItem } from "../types/utils";

export abstract class AbstractLocalStorage<StorageItems extends StorageItem<any, any>> extends AbstractStorage<StorageItems> {

    constructor() {
        super(localStorage);
    }
}
// built in:

// localStorage.getItem
// localStorage.setItem
// localStorage.removeItem
// localStorage.clear
// localStorage.key
// localStorage.length

//? ideas:
//* .map
//* .forEach
//* .filter