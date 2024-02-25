
export class LocalStorageService<T> {

    constructor(private storageKey: string) {}

    async update(tasks: T) {
        localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }

    async get() {
        const val = localStorage.getItem(this.storageKey);
        return !val ? null : JSON.parse(val) as T;
    }

    async _dump() {
        localStorage.clear();
    }
}
