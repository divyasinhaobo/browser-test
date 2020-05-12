import { PipeTransform, Injector } from '@angular/core';
import { RunContextBrowser } from '@mubble/browser/rc-browser';
export declare class GenericPipe implements PipeTransform {
    private rc;
    private injector;
    constructor(rc: RunContextBrowser, injector: Injector);
    transform(value: any, pipeName: string, pipeParams: any[]): any;
}
