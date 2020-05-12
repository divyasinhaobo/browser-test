import { ElementRef, Renderer2 } from '@angular/core';
export declare class NcStyleClassDirective {
    private element;
    private renderer;
    ncClass: string;
    constructor(element: ElementRef, renderer: Renderer2);
    ngAfterViewInit(): void;
}
