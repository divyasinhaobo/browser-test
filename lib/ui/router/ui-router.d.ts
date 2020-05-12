import { Router, NavigationExtras } from '@angular/router';
import { InjectionCaller } from '../mu-components/injection-interface';
import { AlertDialogParams } from '../mu-components/alert-dialog/alert-dialog.component';
import { RunContextBrowser } from '../../rc-browser';
import { Mubble } from '@mubble/core';
export declare const PRIMARY_OUTLET = "primary", MODAL_OUTLET = "modal";
export declare enum TOAST_POSITION {
    TOP = 1,
    MIDDLE = 2,
    BOTTOM = 3
}
export declare enum NavMethod {
    NEXT = 1,
    CURRENT = 2,
    POP = 3
}
export declare type OUTLET = 'primary' | 'modal';
export interface NcNavigationExtras extends NavigationExtras {
    replaceIndex?: number;
    paramsId?: string;
    replaceAllUrls?: boolean;
}
declare class StackItem {
    url: string;
    qpId: string;
    queryParam: Mubble.uObject<any>;
    outlet: OUTLET;
}
export declare class UiRouter {
    private rcBrowser;
    private router;
    private historyWrapper;
    private componentRegistry;
    protected urlStack: StackItem[];
    protected warnedUser: boolean;
    private firstNavDone;
    private browserStack;
    private lastNavMethod;
    private lastPopIndex;
    private lastNavUrl;
    private lastGoingBack;
    private curOutlet;
    private currentQpId;
    private curQueryParam;
    private curCompMap;
    private codePop;
    private runningInBrowser;
    private isSdkApp;
    constructor(rcBrowser: RunContextBrowser, router: Router);
    init(runningInBrowser: boolean, isSdkApp?: boolean): void;
    navigate(routeTo: string, extras?: NcNavigationExtras): Promise<true | undefined>;
    rootNavigate(routeTo: string, extras?: NcNavigationExtras): Promise<true | undefined>;
    areWeGoingBack(): boolean;
    isModalActive(): boolean;
    isShowingPopup(): boolean;
    private navigateByUrl;
    popupBottomIn(component: any, componentRoute: string, queryParams?: any, replaceUrl?: boolean, caller?: InjectionCaller): void;
    popupModal(component: any, componentRoute: string, queryParams?: any, replaceUrl?: boolean, caller?: InjectionCaller): void;
    showAlertDialog(queryParams: AlertDialogParams, caller: InjectionCaller, replaceUrl?: boolean): void;
    hasQueryParamsById(params: any): boolean;
    getUrlStackLength(): number;
    getCurrentComponent(outlet?: string): any;
    getCurrentRouteName(): string;
    onNavCancel(): void;
    getCurQueryParams(): Mubble.uObject<any>;
    getRouteName(url: string): string;
    getModuleName(url: string): string;
    getCurrentQueryParams(): any;
    getQueryParams(params: any): any;
    updateQueryParam(name: string, value: any): void;
    setComponentForOutlet(component: any, outlet?: OUTLET): void;
    removeComponentForOutlet(component: any, outlet?: string): void;
    private showInModal;
    showModalPage(componentRoute: string, queryParams: any, replaceUrl?: boolean): void;
    goBack(whereOrByHowMuch?: string | number): void;
    goBackInternal(whereOrByHowMuch?: string | number): void;
    private onPopState;
    private canCompGoBack;
    private onPopUpClosed;
    protected canGoBack(): boolean;
    private onNavEnd;
    private setComponentParams;
    private syncBrowserHistory;
    private browserGotoRoot;
    registerComponent(compName: string, component: any): void;
    getComponent(compName: string): any;
    onMubbleScreenChange(url: string, outlet: OUTLET, lastNavMethod: NavMethod): void;
    onMubbleScreenNavEnd(url: string, lastNavMethod: NavMethod): void;
    notifyUserBackPress(): boolean;
    notifyAppClose(): void;
    isToolTipShown(): boolean;
    removeOverlayIfExists(): void;
}
export {};
