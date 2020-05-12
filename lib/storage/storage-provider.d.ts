import { RunContextBrowser } from "..";
import { Mubble } from "../../core";
export declare class StorageProvider {
    setGlobalKeyValue(rc: RunContextBrowser, key: string, value: string): void;
    getGlobalKeyValue(rc: RunContextBrowser, key: string): Promise<string>;
    setUserKeyValue(rc: RunContextBrowser, key: string, value: string): void;
    getUserKeyValue(rc: RunContextBrowser, key: string): Promise<string>;
    setGcConfig(rc: RunContextBrowser, config: {
        category: string;
        key: string;
        value: Mubble.uObject<string>;
    }[]): void;
    getGcConfig(rc: RunContextBrowser, category: string, key: string): Promise<string>;
}
