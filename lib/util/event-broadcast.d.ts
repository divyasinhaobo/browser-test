import { RunContextBrowser } from '..';
export declare const EVENT_PREFIX = "mui-event";
export declare namespace EventSystem {
    function broadcast(rc: RunContextBrowser, eventName: string, data?: object): void;
    function eventToElements(rc: RunContextBrowser, eventName: string, elementClassName: string, data: object): void;
    function elementSubscribe(element: HTMLElement, eventName: string, cb: any): void;
    function subscribe(eventName: string, cb: any, options?: AddEventListenerOptions): void;
    function subscribeAll(eventNames: string[], cb: any): void;
}
