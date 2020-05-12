"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Wed Aug 30 2017
   Author     : Sid
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
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
var rc_browser_1 = require("../../../../rc-browser");
var LoadingErrorComponent = /** @class */ (function () {
    function LoadingErrorComponent(rc) {
        this.rc = rc;
        this.apiErrorAction = new core_1.EventEmitter();
    }
    LoadingErrorComponent.prototype.onErrorAction = function () {
        this.apiErrorAction.emit();
    };
    var _a;
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LoadingErrorComponent.prototype, "apiErrorText", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LoadingErrorComponent.prototype, "apiCanRetry", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LoadingErrorComponent.prototype, "apiRetryText", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_a = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _a : Object)
    ], LoadingErrorComponent.prototype, "apiErrorAction", void 0);
    LoadingErrorComponent = __decorate([
        core_1.Component({
            selector: 'loading-error',
            templateUrl: './loading-error.component.html',
            styleUrls: ['./loading-error.component.scss']
        }),
        __param(0, core_1.Inject('RunContext')),
        __metadata("design:paramtypes", [rc_browser_1.RunContextBrowser])
    ], LoadingErrorComponent);
    return LoadingErrorComponent;
}());
exports.LoadingErrorComponent = LoadingErrorComponent;
//# sourceMappingURL=loading-error.component.js.map