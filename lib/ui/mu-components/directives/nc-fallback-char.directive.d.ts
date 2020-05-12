import { ElementRef } from '@angular/core';
export declare class NcFallbackCharDirective {
    private element;
    private dynamicColorObj;
    private initialChar;
    data: string;
    needOneChar: boolean;
    constructor(element: ElementRef);
    ngAfterViewInit(): void;
    createDynamicColor(): void;
    getFirstCharacter(str: string): string;
    setColor(key: string): void;
}
