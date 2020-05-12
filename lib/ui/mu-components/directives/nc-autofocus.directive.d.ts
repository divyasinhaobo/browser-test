import { ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
export declare class NcAutoFocusDirective implements AfterViewInit {
    private element;
    private changeRef;
    constructor(element: ElementRef, changeRef: ChangeDetectorRef);
    ngAfterViewInit(): void;
}
