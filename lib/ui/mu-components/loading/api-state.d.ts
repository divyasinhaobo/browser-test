import { RunContextBrowser } from "../../../rc-browser";
import { TranslateService } from "../translate";
export declare enum API_STATE {
    PROGRESS = 1,
    ERROR = 2,
    ERROR_NO_DATA = 3,
    SUCCESS = 4
}
export declare class ApiState {
    private rc;
    private translate;
    currentState: API_STATE;
    loadingText: string;
    emptyDataText: string;
    errorText: string;
    retryButtonText: string;
    retryOnFailure: boolean;
    errorCode: string;
    constructor(rc: RunContextBrowser, translate: TranslateService);
}
export declare class ApiStateBuilder {
    private rc;
    private translate;
    private instance;
    constructor(rc: RunContextBrowser, translate: TranslateService);
    setCurrentState(state: API_STATE): ApiStateBuilder;
    setLoadingText(text: string): ApiStateBuilder;
    setEmptyDataText(text: string): ApiStateBuilder;
    setErrorText(text: string): ApiStateBuilder;
    setRetryButtonText(text: string): ApiStateBuilder;
    retryOnFailure(): this;
    setErrorCode(code: string): ApiStateBuilder;
    build(): ApiState;
}
