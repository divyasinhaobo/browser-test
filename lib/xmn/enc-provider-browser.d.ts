import { ConnectionInfo, WireObject, WssProviderConfig } from '@mubble/core';
import { RunContextBrowser } from '../rc-browser';
export declare class EncryptionBrowser {
    private rc;
    private ci;
    private rsaPubKey;
    private syncKey;
    constructor(rc: RunContextBrowser, ci: ConnectionInfo, rsaPubKey: Uint8Array);
    init(): Promise<void>;
    encodeHeader(wsConfig: WssProviderConfig): Promise<string>;
    private encryptSymKey;
    private encrypt;
    private decrypt;
    private getArrayBuffer;
    encodeBody(data: WireObject[]): Promise<Uint8Array>;
    private stringifyWireObjects;
    decodeBody(data: ArrayBuffer): Promise<[WireObject]>;
    setNewKey(syncKey: string): Promise<void>;
    getSyncKeyB64(): Promise<string>;
    binToUnit8Ar(binStr: string): Uint8Array;
    strToUnit8Ar(str: string): Uint8Array;
    uint8ArToStr(uar: Uint8Array): string;
    private extractShortCode;
    private extractUniqueId;
}
