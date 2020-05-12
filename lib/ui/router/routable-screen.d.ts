import { TrackableScreen } from './trackable-screen';
import { RunContextBrowser } from '../../rc-browser';
import { Mubble } from '@mubble/core';
export declare abstract class RoutableScreen extends TrackableScreen {
    protected rc: RunContextBrowser;
    abstract onRouterInit(queryParams: Mubble.uObject<any>, firstInvocation: boolean): void;
    constructor(rc: RunContextBrowser);
}
