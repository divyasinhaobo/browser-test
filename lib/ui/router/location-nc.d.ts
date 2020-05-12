import { LocationChangeListener, PlatformLocation } from '@angular/common';
import { RunContextBrowser } from '../../rc-browser';
export declare class NcPlatformLocation extends PlatformLocation {
    private rc;
    constructor(rc: RunContextBrowser);
    readonly location: Location;
    getState(): void;
    getBaseHrefFromDOM(): string;
    onPopState(fn: LocationChangeListener): void;
    onHashChange(fn: LocationChangeListener): void;
    readonly hostname: string;
    readonly port: string;
    readonly href: string;
    readonly protocol: string;
    pathname: string;
    readonly search: string;
    readonly hash: string;
    pushState(state: any, title: string, url: string): void;
    replaceState(state: any, title: string, url: string): void;
    forward(): void;
    back(): void;
}
