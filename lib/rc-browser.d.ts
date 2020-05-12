import { RunContextBase, RUN_MODE, LOG_LEVEL, InitConfig, RunState, RCLoggerBase } from '@mubble/core';
import { GlobalKeyValue, UserKeyValue } from './storage';
export { LOG_LEVEL, RUN_MODE } from '@mubble/core';
export declare class InitConfigBrowser extends InitConfig {
    constructor(runMode: RUN_MODE, logLevel: LOG_LEVEL, tzMin?: number | undefined);
}
export declare class RunStateBrowser extends RunState {
}
export declare class RCBrowserLogger extends RCLoggerBase {
    rc: RunContextBrowser;
    constructor(rc: RunContextBrowser);
    logToConsole(level: LOG_LEVEL, logStr: string): void;
}
export declare abstract class RunContextBrowser extends RunContextBase {
    initConfig: InitConfigBrowser;
    runState: RunStateBrowser;
    lang: string;
    globalKeyVal: GlobalKeyValue;
    userKeyVal: UserKeyValue;
    protected constructor(initConfig: InitConfigBrowser, runState: RunStateBrowser, contextId?: string, contextName?: string);
    init(): void;
    clone(newRc: RunContextBrowser): void;
}
