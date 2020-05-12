import { EventEmitter, ElementRef, NgZone, Renderer2 } from '@angular/core';
import { RunContextApp } from 'framework';
import { TrackableScreen } from '@mubble/browser';
import { NailInterface } from '../../nail';
export interface DialerOptions {
    id: string | number;
    value: string | number;
}
export interface DialerCssClasses {
    bgColor?: string;
    activeColor?: string;
    inActiveColor?: string;
}
export interface DialerParams {
    dialerOptions: DialerOptions[];
    isCircular?: boolean;
    highlightPos?: number;
    dialerCssClasses?: DialerCssClasses;
    selectedItem?: DialerOptions;
}
export declare class DialerComponent implements NailInterface {
    protected rc: RunContextApp;
    private renderer;
    private ngZone;
    onHostKeyup(event: KeyboardEvent): void;
    scrollCont: ElementRef;
    contentHolder: ElementRef;
    parentDiv: ElementRef;
    dialerParams: DialerParams;
    eventPropagte: boolean;
    screen: TrackableScreen;
    value: EventEmitter<DialerOptions>;
    viewPortItems: DialerOptions[];
    selectedItem: DialerOptions;
    private nail;
    private multiStepVal;
    private lastIndex;
    private sound;
    constructor(rc: RunContextApp, renderer: Renderer2, ngZone: NgZone);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private onKeyDown;
    onPanStart(): void;
    onPanMove(event: any): boolean;
    onPanAnimate(value: number): void;
    onPanEnd(event: any): void;
    getSelectedItem(): void;
    scrollToElem(index: number): void;
}
