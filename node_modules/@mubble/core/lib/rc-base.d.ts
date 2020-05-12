import { ConnectionInfo, WireEventResp, WireReqResp, WireObject } from './xmn';
import { Timer } from './util/timer';
export declare enum LOG_LEVEL {
    DEBUG = 1,
    STATUS = 2,
    WARN = 3,
    ERROR = 4,
    NONE = 5
}
export declare enum RUN_MODE {
    DEV = 0,
    QA = 1,
    PRE_PROD = 2,
    PROD = 3,
    LOAD = 4
}
export declare abstract class ExternalLogger {
    abstract log(level: LOG_LEVEL, logMsg: string): void;
    abstract sessionLog(sessionLogBuf: string, sessionFileName: string): void;
    abstract accessLog(logBuf: string): void;
}
export declare class InitConfig {
    logLevel: LOG_LEVEL;
    consoleLogging: boolean;
    tzMin?: number | undefined;
    externalLogger?: ExternalLogger | undefined;
    runMode: RUN_MODE;
    constructor(logLevel: LOG_LEVEL, consoleLogging: boolean, tzMin?: number | undefined, externalLogger?: ExternalLogger | undefined);
}
export declare class RunState {
    moduleLLMap: {
        [key: string]: any;
    };
    modLogLevel: LOG_LEVEL;
    moduleNameMap: WeakMap<any, string>;
}
export declare abstract class RunContextBase {
    initConfig: InitConfig;
    runState: RunState;
    contextId?: string | undefined;
    contextName?: string | undefined;
    logger: RCLoggerBase;
    timer: Timer;
    protected constructor(initConfig: InitConfig, runState: RunState, contextId?: string | undefined, contextName?: string | undefined);
    init(): void;
    abstract copyConstruct(contextId?: string, contextName?: string): any;
    clone(newRcb: RunContextBase): void;
    finish(ic: ConnectionInfo, resp: WireEventResp | WireReqResp, req: WireObject, apiName?: string): void;
    setupLogger(obj: any, moduleName: string, logLevel?: LOG_LEVEL): void;
    getGlobalLogLevel(): LOG_LEVEL;
    setGlobalLogLevel(logLevel: LOG_LEVEL): void;
    getLogLevel(): LOG_LEVEL;
    /**
     * Tries to figure out the name of the context
     * @param obj: this
     */
    getName(obj: any): string;
    isDebug(): boolean;
    isStatus(): boolean;
    isWarn(): boolean;
    isError(): boolean;
    isAssert(): boolean;
    debug(moduleName: string, ...args: any[]): string;
    status(moduleName: string, ...args: any[]): string;
    warn(moduleName: string, ...args: any[]): string;
    error(moduleName: string, ...args: any[]): string;
    assert(moduleName: string, condition: any, ...args: any[]): void;
    hasLogged(): boolean;
}
export declare type MaskingDataParams = {
    maskKey: string;
    maskWith?: string;
    startSkipCount?: number;
    endSkipCount?: number;
};
export declare type LogCacheEntry = {
    ts: number;
    moduleName: string;
    level: LOG_LEVEL;
    log: string;
};
export declare function safeReplacerFn(): (key: string, value: any) => any;
export declare abstract class RCLoggerBase {
    rc: RunContextBase;
    sesLogCache: LogCacheEntry[];
    lastLogTS: number;
    sessionContext: boolean;
    startTs: number;
    private k;
    traceSpans: {
        [traceId: string]: {
            startTime: number;
            endTime: number;
        };
    };
    finishedTraceSpans: {
        id: string;
        startTime: number;
        endTime: number;
    }[];
    ignoreTrace: boolean;
    protected constructor(rc: RunContextBase);
    finish(ic: ConnectionInfo, er: WireEventResp | WireReqResp, req: WireObject, apiName?: string): void;
    startTraceSpan(id: string): number | undefined;
    endTraceSpan(id: string, ackNumber: number | undefined): void;
    getWorkerIdentifier(): string | null;
    abstract logToConsole(level: LOG_LEVEL, logMsg: string): void;
    log(moduleName: string, level: LOG_LEVEL, args: any[]): string;
    private durationStr;
    protected objectToString(obj: Object, maxLevels: number, pendingLevels?: number): string;
}
