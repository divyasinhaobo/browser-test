import { OnInit } from '@angular/core';
import { RunContextBrowser } from '../../../rc-browser';
export declare class LoadingComponent implements OnInit {
    private rc;
    apiLoadingText: string;
    apiLoadingBottomIn: boolean;
    customClass: string;
    constructor(rc: RunContextBrowser);
    ngOnInit(): void;
}
