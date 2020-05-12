export declare const Segment: {
    version: string;
};
export declare const MASTER_UPDATE_EVENT = "mubble-master-update";
/**
 *
 * A brief description of segment data structure:
 * An app installation subscribes to multiple segment names. Each segment can
 * have multiple values. These are best understood with the structure below
 *
 * operator segment [['AT'], ['VF']]
 * opcr     segment [['AT','KA'], ['VF', 'KA']]
 * version  segment [['1.0.4']] // only one version can be installed
 */
export declare type SegmentType = any[][];
export interface SyncHashModel {
    ts: number;
    seg?: SegmentType;
}
export interface SyncHashModels {
    [modelName: string]: SyncHashModel;
}
export interface Segments {
    [segName: string]: SegmentType;
}
export interface SyncRequest {
    segments: Segments;
    hash: SyncHashModels;
}
export interface SyncModelResponse {
    mod: object[];
    del: object[];
    purge?: boolean;
    hash: SyncHashModel;
}
export interface SyncResponse {
    [modelName: string]: SyncModelResponse;
}
