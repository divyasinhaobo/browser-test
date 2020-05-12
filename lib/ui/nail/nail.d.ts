import { Renderer2 } from '@angular/core';
import { NailInterface, NailConfig } from './nail-interface';
import { RunContextBrowser } from '../../rc-browser';
export declare class Nail {
    private rc;
    private element;
    private appComponent;
    private renderer;
    private config;
    private session;
    private pageWidth;
    private compName;
    private measure;
    private animateFn;
    private handlers;
    constructor(rc: RunContextBrowser, element: HTMLElement, appComponent: NailInterface, renderer: Renderer2, config: NailConfig);
    changeConfig(config: any): void;
    requestAnimate(...animateParam: any[]): void;
    setDirections(disallowLeft: boolean, disallowRight: boolean): void;
    private setConfig;
    onNailEvent(event: any): true | undefined;
    private panEndEvent;
    private extractEventAttr;
    private ascertainDirection;
    private onRunAnimation;
    destroy(): void;
}
