import { OnDestroy, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InjectionCaller, InjectionParent, InjectedChild } from './injection-interface';
import { UiRouter } from '../router/ui-router';
import { RunContextBrowser } from '../../rc-browser';
import { Mubble } from '@mubble/core';
export declare abstract class InjectionParentBase implements OnDestroy, InjectionParent {
    rc: RunContextBrowser;
    router: UiRouter;
    private componentFactoryResolver;
    private route;
    childRequestedClose: boolean;
    injectedComponent: InjectedChild;
    private icRef;
    caller: InjectionCaller;
    constructor(rc: RunContextBrowser, router: UiRouter, componentFactoryResolver: ComponentFactoryResolver, route: ActivatedRoute);
    onRouterInit(params: Mubble.uObject<any>, injectAt: ViewContainerRef, showTitle: boolean): void;
    private injectComponent;
    close(): void;
    ngOnDestroy(): void;
}
