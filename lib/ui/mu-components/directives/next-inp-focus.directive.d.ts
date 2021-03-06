import { EventEmitter } from '@angular/core';
import { RunContextBrowser } from '../../../rc-browser';
export declare class NextInpFocusDirective {
    protected rc: RunContextBrowser;
    onHostSubmit(event: any): void;
    nextInpFocusElem: HTMLElement;
    onSubmit: EventEmitter<any>;
    constructor(rc: RunContextBrowser);
    private onEnter;
}
