import { RunContextBrowser } from '../rc-browser';
import { WireObject } from '../../core/xmn/xmn-core';
export interface XmnRouterBase {
    getPubKey(): Uint8Array;
    getMaxOpenSecs(): number;
    canStrtLastReqTimer(rc: RunContextBrowser): boolean;
    providerReady(): any;
    providerMessage(rc: RunContextBrowser, arData: WireObject[]): any;
    providerFailed(errCode?: string): any;
    getSessionTimeOutSecs(rc: RunContextBrowser): any;
    sessionTimedOut(rc: RunContextBrowser): any;
}
