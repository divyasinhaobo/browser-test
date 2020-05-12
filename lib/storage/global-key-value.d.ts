import 'reflect-metadata';
import { RunContextBrowser } from '../rc-browser';
import { StorageProvider } from './storage-provider';
export declare abstract class GlobalKeyValue {
    private rc;
    private storage;
    syncSegments: object;
    jsVersion: string;
    logLevel: number;
    static autoStore(): any;
    private static fieldMap;
    constructor(rc: RunContextBrowser, storage: StorageProvider);
    init(): Promise<this>;
    detectSaveChanges(): void;
    private extractFields;
    $dump(): Promise<void>;
}
