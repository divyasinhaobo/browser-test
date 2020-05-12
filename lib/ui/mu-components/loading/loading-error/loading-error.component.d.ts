import { EventEmitter } from '@angular/core';
import { RunContextBrowser } from '../../../../rc-browser';
export declare class LoadingErrorComponent {
    private rc;
    apiErrorText: string;
    apiCanRetry: string;
    apiRetryText: string;
    apiErrorAction: EventEmitter<any>;
    constructor(rc: RunContextBrowser);
    onErrorAction(): void;
}
