import { ElementRef, Renderer2 } from '@angular/core';
export declare class KeyboardDirective {
    protected rc: any;
    private element;
    private renderer;
    parentDiv: HTMLElement;
    private originalParentHeight;
    private originalBodyHeight;
    private isHeghtAuto;
    constructor(rc: any, element: ElementRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    private handleKeyBoardEvents;
    private onBlur;
    private onCustomEvent;
    ngOnDestroy(): void;
}
