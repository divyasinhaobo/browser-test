export declare const INJECTION_PARAM: {
    CALLER: string;
    INJECT: string;
};
export interface InjectionCaller {
    setResult(calleeId: string, result: any): any;
}
export interface InjectionParent {
    close(): void;
}
export interface InjectedChild {
    initFromParent?(ip: InjectionParent, showTitle: boolean): void;
    setCaller?(caller: InjectionCaller): void;
    setParam?(params: object): void;
    closeFromParent?(): void;
    ngOnDestroy?(): void;
    canGoBack?(): boolean;
    onBackPressed?(): void;
}
export interface BottomInInterface extends InjectedChild {
    getHalfHeight(): number;
    getTitle(): string;
    getDefaultState?(): any;
}
export interface ModalInterface extends InjectedChild {
    getWidth(): string;
    getCssClassName?(): string;
    isNotDismissable?(): boolean;
    isNotScrollable?(): boolean;
}
