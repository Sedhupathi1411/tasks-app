import { Preferences } from '@capacitor/preferences';

export class StorageService<T> {

    constructor(private storageKey: string) {}

    async update(tasks: T) {
        await Preferences.set({
            key: this.storageKey,
            value: JSON.stringify(tasks)
        });
    }

    async get() {
        const val = await Preferences.get({ key: this.storageKey });
        return !val.value ? null : JSON.parse(val.value) as T;
    }

    async _dump() {
        await Preferences.clear();
    }
}
