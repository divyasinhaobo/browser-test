"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var trackable_screen_1 = require("../../../ui/router/trackable-screen");
var shared_router_constants_1 = require("../../router/shared-router-constants");
var rc_browser_1 = require("../../../rc-browser");
var DIALOG_RESULT;
(function (DIALOG_RESULT) {
    DIALOG_RESULT["YES"] = "YES";
    DIALOG_RESULT["NO"] = "NO";
})(DIALOG_RESULT = exports.DIALOG_RESULT || (exports.DIALOG_RESULT = {}));
var AlertDialogComponent = /** @class */ (function (_super) {
    __extends(AlertDialogComponent, _super);
    function AlertDialogComponent(rc) {
        var _this = _super.call(this, rc) || this;
        _this.rc = rc;
        return _this;
    }
    AlertDialogComponent.prototype.getWidth = function () {
        return '80vw';
    };
    AlertDialogComponent.prototype.getRouteName = function () {
        return shared_router_constants_1.ComponentRoutes.Alert;
    };
    AlertDialogComponent.prototype.isUserVisited = function () {
        return true;
    };
    /*=====================================================================
                                    CALLBACKS
    =====================================================================*/
    AlertDialogComponent.prototype.setParam = function (queryParams) {
        this.rc.isAssert() && this.rc.assert(this.rc.getName(this), queryParams['message'] &&
            queryParams['positiveActText'], "missing queryparams " + queryParams);
        this.title = queryParams['title'];
        this.message = queryParams['message'];
        this.positiveActText = queryParams['positiveActText'];
        this.negativeActText = queryParams['negativeActText'] || '';
        this.contextId = queryParams['contextId'] || '';
        this.allowBack = queryParams['canGoBack'];
        this.showCloseBtn = queryParams['showCloseBtn'] || false;
        this.positiveLink = queryParams['positiveLink'];
    };
    AlertDialogComponent.prototype.setCaller = function (caller) {
        this.caller = caller;
    };
    AlertDialogComponent.prototype.initFromParent = function (ip, showTitle) {
        this.myParent = ip;
    };
    AlertDialogComponent.prototype.close = function () {
        this.myParent.close();
    };
    AlertDialogComponent.prototype.closeFromParent = function () {
        var result = {
            result: this.result,
            contextId: this.contextId,
            positiveLink: this.positiveLink
        };
        this.caller.setResult(this.getRouteName(), result);
    };
    AlertDialogComponent.prototype.isNotDismissable = function () {
        return true;
    };
    AlertDialogComponent.prototype.canGoBack = function () {
        var canGoBack = this.allowBack !== undefined;
        return canGoBack ? this.allowBack : true;
    };
    /*=====================================================================
                                HTML FUNCTIONS
    =====================================================================*/
    AlertDialogComponent.prototype.onCancel = function () {
        this.result = DIALOG_RESULT.NO;
        this.close();
    };
    AlertDialogComponent.prototype.onContinue = function () {
        this.result = DIALOG_RESULT.YES;
        this.allowBack = true;
        this.close();
    };
    AlertDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-alert-dialog',
            templateUrl: './alert-dialog.component.html',
            styleUrls: ['./alert-dialog.component.scss']
        }),
        __param(0, core_1.Inject('RunContext')),
        __metadata("design:paramtypes", [rc_browser_1.RunContextBrowser])
    ], AlertDialogComponent);
    return AlertDialogComponent;
}(trackable_screen_1.TrackableScreen));
exports.AlertDialogComponent = AlertDialogComponent;
//# sourceMappingURL=alert-dialog.component.js.map