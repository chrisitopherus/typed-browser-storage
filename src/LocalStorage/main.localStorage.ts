/**
 * LocalStorage.
 * @class
 */
export class LocalStorage {

    private static _instance: LocalStorage;

    private constructor() {
        console.log("created Instance");
    }

    /**
     * Method for creating or getting the instance.
     * @public
     * @static
     */
    public static get() {
        if (!this._instance) this._instance = new LocalStorage();
        return this._instance;
    }

}