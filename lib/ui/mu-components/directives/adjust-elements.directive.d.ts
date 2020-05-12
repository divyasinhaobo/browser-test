import { ElementRef } from '@angular/core';
export interface WebModeCss {
    width: string;
    marginRight?: string;
    maxWidth?: string;
}
export declare class AdjustElementsDirective {
    private element;
    displayCount: number;
    index: number;
    webMode: boolean;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
    private calcWidth;
}
