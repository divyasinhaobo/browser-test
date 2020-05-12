import { RunContextBrowser } from '../rc-browser';
import { StorageProvider } from './storage-provider';
import { Mubble } from '@mubble/core';
export declare class ConfigKeyVal {
    private rc;
    private storage;
    constructor(rc: RunContextBrowser, storage: StorageProvider);
    setConfig(config: {
        category: string;
        key: string;
        value: Mubble.uObject<string>;
    }[]): Promise<void>;
    getConfig(category: string, key: string): Promise<Mubble.uObject<string>>;
}
