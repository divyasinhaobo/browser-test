import { ElementRef, Renderer2, NgZone, EventEmitter } from '@angular/core';
export declare class NcMaxLengthDirective {
    private element;
    private renderer;
    private ngZone;
    maxLength: number;
    updatedValue: EventEmitter<string>;
    private eventHandlers;
    constructor(element: ElementRef, renderer: Renderer2, ngZone: NgZone);
    ngAfterViewInit(): void;
    private clipBoardEventHandler;
    private eventHandler;
    private emitUpdatedValue;
    ngOnDestroy(): void;
}
