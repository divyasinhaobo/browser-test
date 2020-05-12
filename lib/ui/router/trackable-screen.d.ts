import { RunContextBrowser } from '@mubble/browser/rc-browser';
export declare abstract class TrackableScreen {
    protected rc: RunContextBrowser;
    abstract getRouteName(): string;
    constructor(rc: RunContextBrowser);
    onApiComplete(success: boolean): void;
    ngOnDestroy(): void;
}
