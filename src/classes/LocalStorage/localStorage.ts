import { AbstractStorage } from "../abstract.storage";
import { StorageItem } from "../../types/utils";

export abstract class AbstractLocalStorage<StorageItems extends StorageItem<any, unknown>> extends AbstractStorage<StorageItems> {

    constructor() {
        super(window, localStorage);
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