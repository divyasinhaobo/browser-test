import { InjectionCaller, InjectionParent, ModalInterface } from '../injection-interface';
import { TrackableScreen } from '../../../ui/router/trackable-screen';
import { RunContextBrowser } from '../../../rc-browser';
export interface AlertDialogParams {
    message: string;
    positiveActText: string;
    title?: string;
    negativeActText?: string;
    contextId?: string;
    canGoBack?: boolean;
    showCloseBtn?: boolean;
    positiveLink?: string;
}
export interface AlertDialogResult {
    result: DIALOG_RESULT;
    contextId?: string;
    positiveLink?: string;
}
export declare enum DIALOG_RESULT {
    YES = "YES",
    NO = "NO"
}
export declare class AlertDialogComponent extends TrackableScreen implements ModalInterface {
    protected rc: RunContextBrowser;
    private caller;
    private myParent;
    private result;
    private contextId;
    private allowBack;
    showCloseBtn: boolean;
    title: string;
    message: string;
    positiveActText: string;
    negativeActText: string;
    positiveLink: string;
    constructor(rc: RunContextBrowser);
    getWidth(): string;
    getRouteName(): string;
    isUserVisited(): boolean;
    setParam(queryParams: any): void;
    setCaller(caller: InjectionCaller): void;
    initFromParent(ip: InjectionParent, showTitle: boolean): void;
    close(): void;
    closeFromParent(): void;
    isNotDismissable(): boolean;
    canGoBack(): boolean;
    onCancel(): void;
    onContinue(): void;
}
