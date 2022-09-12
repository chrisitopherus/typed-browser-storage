export class EventEmitter {
    private _storage: {
        [event: string]: Array<(data: unknown) => unknown>
    } = {};

    constructor() {
        // do nothing here
    }

    /**
     * Method for adding a new event handler.
     * @param event Name of the event.
     * @param fn Function that is called when the specified event is fired.
     * @public
     */
    public on(event: "storage", fn: (data: StorageEvent) => unknown): void
    public on(event: string, fn: (data: unknown) => unknown): void
    public on(event: string, fn: (data: any) => unknown) {
        // if not defined -> initialize
        if (!this._storage[event]) this._storage[event] = [];

        // add listener
        this._storage[event].push(fn);
    }

    /**
     * Method for emitting a event.
     * @param event Name of the event.
     * @param data Data to be fired with the event.
     * @public
     */
    public emit(event: "storage", data: StorageEvent): void
    public emit(event: string, data: any): void
    public emit(event: string, data: any) {
        // if no listeners exist -> exit
        if (!this._storage[event]) return;

        // iterate through storage at given event
        for (let i = 0; i < this._storage[event].length; ++i) {
            // call the listener
            this._storage[event][i](data);
        }
    }
}