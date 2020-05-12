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
var rc_browser_1 = require("../../../rc-browser");
var LoadingComponent = /** @class */ (function () {
    function LoadingComponent(rc) {
        this.rc = rc;
    }
    LoadingComponent.prototype.ngOnInit = function () {
        if (this.apiLoadingBottomIn === undefined)
            this.apiLoadingBottomIn = false;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LoadingComponent.prototype, "apiLoadingText", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LoadingComponent.prototype, "apiLoadingBottomIn", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LoadingComponent.prototype, "customClass", void 0);
    LoadingComponent = __decorate([
        core_1.Component({
            selector: 'loading',
            templateUrl: './loading.component.html',
            styleUrls: ['./loading.component.scss']
        }),
        __param(0, core_1.Inject('RunContext')),
        __metadata("design:paramtypes", [rc_browser_1.RunContextBrowser])
    ], LoadingComponent);
    return LoadingComponent;
}());
exports.LoadingComponent = LoadingComponent;
//# sourceMappingURL=loading.component.js.map