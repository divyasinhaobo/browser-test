import Dexie from 'dexie';
import { RunContextBrowser } from '../rc-browser';
import { SyncHashModels, SyncRequest, Mubble } from '@mubble/core';
export declare const Segment: {
    version: string;
};
declare class ModelField {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'array' | 'object';
    optional: boolean;
    constructor(name: string, type: 'string' | 'number' | 'boolean' | 'array' | 'object', optional: boolean);
    toString(): string;
}
export declare type VersionSchema = {
    version: number;
    tableSchema: Mubble.uObject<string>;
    upgrade?: () => void;
};
export declare abstract class MasterDb extends Dexie {
    static schemaKey: Mubble.uObject<Mubble.uObject<ModelField>>;
    static schemaField: Mubble.uObject<Mubble.uObject<ModelField>>;
    static classMap: Map<Function, string>;
    syncHashModels: SyncHashModels;
    static registerModelClass(modelName: string, classFn: Function): void;
    static getModelName(classFn: Function): string | undefined;
    static registerSchema(modelName: string, fieldName: string, isPrimaryKey: boolean, fieldType: 'string' | 'number' | 'boolean' | 'array' | 'object', optional: boolean): void;
    constructor(rc: RunContextBrowser, version: string, versionSchema: VersionSchema[]);
    init(rc: RunContextBrowser): Promise<void>;
    onRouterAvailable(rc: RunContextBrowser): void;
    getSyncRequest(rc: RunContextBrowser): SyncRequest;
    abstract afterMasterUpdate(rc: RunContextBrowser): Promise<void>;
    getTableForClass(rc: RunContextBrowser, classFn: Function): any;
    private verifySegmentVersion;
    private buildSchema;
    onMasterUpdate(rc: RunContextBrowser, eventName: string, data: any): Promise<void>;
    private applyMasterData;
    private clear;
    private bulkPut;
    private buildKeyRec;
    private buildFullRec;
    private validateType;
    private bulkDelete;
    private getTable;
    private $all;
}
export {};
