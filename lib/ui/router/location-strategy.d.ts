import { LocationStrategy, LocationChangeListener } from '@angular/common';
import { RunContextBrowser } from '@mubble/browser/rc-browser';
export declare class AppLocationStrategy extends LocationStrategy {
    protected rc: RunContextBrowser;
    constructor(rc: RunContextBrowser);
    getBaseHref(): string;
    path(): string;
    prepareExternalUrl(): string;
    onPopState(fn: LocationChangeListener): void;
    pushState(state: any, title: string, path: string, queryParams: string): void;
    replaceState(state: any, title: string, path: string, queryParams: string): void;
    forward(): void;
    back(): void;
}
