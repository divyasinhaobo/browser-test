import { Mubble, RunContextBase } from '..';
import { CustomData } from './custom-data';
export declare enum Protocol {
    HTTP = 0,
    WEBSOCKET = 1,
    HTTPS = 2,
    HTTP_THIRD = 3
}
export declare const HANDSHAKE = "__handshake__";
export declare namespace HTTP {
    const HeaderKey: {
        userAgent: string;
        clientSecret: string;
        contentType: string;
        contentLength: string;
        contentEncoding: string;
        clientId: string;
        versionNumber: string;
        requestTs: string;
        symmKey: string;
        requestType: string;
        bodyEncoding: string;
        transferEncoding: string;
        authorization: string;
        token: string;
    };
    const HeaderValue: {
        form: string;
        stream: string;
        json: string;
        gzip: string;
        deflate: string;
        identity: string;
        version2: string;
        chunked: string;
    };
    const Const: {
        protocolHttp: string;
        protocolHttps: string;
    };
    const Method: {
        PUT: string;
        GET: string;
        POST: string;
        DELETE: string;
    };
    const CurrentProtocolVersion: string;
}
export declare const NetworkType: {
    net2G: string;
    net3G: string;
    net4G: string;
    net5G: string;
    wifi: string;
    unknown: string;
    absent: string;
};
export declare const WEB_SOCKET_URL: {
    ENC_PUBLIC: string;
    ENC_PRIVATE: string;
    PLAIN_PUBLIC: string;
    PLAIN_PRIVATE: string;
};
export declare const WIRE_TYPE: {
    REQUEST: string;
    EVENT: string;
    SYS_EVENT: string;
    EPH_EVENT: string;
    EVENT_RESP: string;
    REQ_RESP: string;
};
export declare class WireObject {
    static getWireObject(json: any): WireRequest | WireEvent | WireEphEvent | WireSysEvent | WireEventResp | WireReqResp | null;
    static parseString(str: string): WireObject;
    type: string;
    name: string;
    ts: number;
    data: Mubble.uObject<any>;
    constructor(type: string, name: string, data: object, ts?: any);
    stringify(): string;
    toString(): string;
}
export declare class WireRequest extends WireObject {
    resolve?: any;
    reject?: any;
    _isSent: boolean;
    constructor(apiName: string, data: object, ts?: number, resolve?: any, reject?: any);
}
export declare class WireEvent extends WireObject {
    constructor(eventName: string, data: object, ts?: number);
}
export declare class WireEphEvent extends WireObject {
    constructor(eventName: string, data: object, ts?: number);
}
export declare class WireReqResp extends WireObject {
    errorCode: string | null;
    errorMessage: string | null;
    _err?: any;
    constructor(name: string, ts: number, data: object, errorCode?: string, errorMessage?: string, fullErr?: any);
}
export declare class WireEventResp extends WireObject {
    errorCode: string | null;
    errorMessage: string | null;
    _err?: any;
    constructor(name: string, ts: number, data?: object, errorCode?: string, errorMessage?: string, fullErr?: any);
}
export declare const SYS_EVENT: {
    WS_PROVIDER_CONFIG: string;
    ERROR: string;
    PING: string;
};
export declare class WireSysEvent extends WireObject {
    constructor(eventName: string, data: object);
}
export interface WebSocketConfig {
    msPingInterval: number;
    syncKey?: string;
}
export interface WssProviderConfig {
    pingSecs: number;
    maxOpenSecs: number;
    toleranceSecs: number;
    key: string;
    custom: CustomData;
}
export declare const WssErrorCode: {
    HANDSHAKE_FAILURE: number;
    INVALID_REQUESTTS: number;
};
export interface ConnectionError {
    code: string;
    msg: string;
}
export interface InvocationData {
    name: string;
    ts: number;
    params: object;
}
export declare const DataLeader: {
    BINARY: number;
    DEF_JSON: number;
    JSON: number;
    ENC_BINARY: number;
    ENC_DEF_JSON: number;
    ENC_JSON: number;
};
export declare const Encoder: {
    MIN_SIZE_TO_COMPRESS: number;
};
export interface XmnProvider {
    send(rc: RunContextBase, data: WireObject[]): void;
    requestClose(rc: RunContextBase): void;
}
export interface ActiveProviderCollection {
    addActiveProvider(clientId: number, provider: XmnProvider): void;
    getActiveProvider(clientId: number): XmnProvider | undefined;
}
