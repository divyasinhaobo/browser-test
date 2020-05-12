"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var API_STATE;
(function (API_STATE) {
    API_STATE[API_STATE["PROGRESS"] = 1] = "PROGRESS";
    API_STATE[API_STATE["ERROR"] = 2] = "ERROR";
    API_STATE[API_STATE["ERROR_NO_DATA"] = 3] = "ERROR_NO_DATA";
    API_STATE[API_STATE["SUCCESS"] = 4] = "SUCCESS";
})(API_STATE = exports.API_STATE || (exports.API_STATE = {}));
var ApiState = /** @class */ (function () {
    function ApiState(rc, translate) {
        this.rc = rc;
        this.translate = translate;
        this.retryOnFailure = false;
        this.loadingText = translate.instant('cmn_loading');
        this.errorText = translate.instant('cmn_toast_err_unknown');
        this.retryButtonText = translate.instant('cmn_btn_retry');
    }
    return ApiState;
}());
exports.ApiState = ApiState;
var ApiStateBuilder = /** @class */ (function () {
    function ApiStateBuilder(rc, translate) {
        this.rc = rc;
        this.translate = translate;
        this.instance = new ApiState(rc, translate);
    }
    ApiStateBuilder.prototype.setCurrentState = function (state) {
        this.instance.currentState = state;
        return this;
    };
    ApiStateBuilder.prototype.setLoadingText = function (text) {
        this.instance.loadingText = text;
        return this;
    };
    ApiStateBuilder.prototype.setEmptyDataText = function (text) {
        this.instance.emptyDataText = text;
        return this;
    };
    ApiStateBuilder.prototype.setErrorText = function (text) {
        this.instance.errorText = text;
        return this;
    };
    ApiStateBuilder.prototype.setRetryButtonText = function (text) {
        this.instance.retryButtonText = text;
        return this;
    };
    ApiStateBuilder.prototype.retryOnFailure = function () {
        this.instance.retryOnFailure = true;
        return this;
    };
    ApiStateBuilder.prototype.setErrorCode = function (code) {
        this.instance.errorCode = code;
        return this;
    };
    ApiStateBuilder.prototype.build = function () {
        return this.instance;
    };
    return ApiStateBuilder;
}());
exports.ApiStateBuilder = ApiStateBuilder;
//# sourceMappingURL=api-state.js.map