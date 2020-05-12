"use strict";
/*------------------------------------------------------------------------------
   About      : As we have implemented our own history wrapper, this class
                prevents angular from  mainpulating history
   
   Created on : Sun Mar 17 2019
   Author     : Aditya Baddur
   
   Copyright (c) 2019 Obopay. All rights reserved.
------------------------------------------------------------------------------*/
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
var common_1 = require("@angular/common");
var rc_browser_1 = require("@mubble/browser/rc-browser");
var AppLocationStrategy = /** @class */ (function (_super) {
    __extends(AppLocationStrategy, _super);
    function AppLocationStrategy(rc) {
        var _this = _super.call(this) || this;
        _this.rc = rc;
        return _this;
    }
    AppLocationStrategy.prototype.getBaseHref = function () {
        return '.';
    };
    AppLocationStrategy.prototype.path = function () {
        return location.pathname;
    };
    AppLocationStrategy.prototype.prepareExternalUrl = function () {
        return '';
    };
    AppLocationStrategy.prototype.onPopState = function (fn) {
    };
    AppLocationStrategy.prototype.pushState = function (state, title, path, queryParams) {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), "ignoring push state \n      " + state + " , " + title + ", " + path + ", " + queryParams);
    };
    AppLocationStrategy.prototype.replaceState = function (state, title, path, queryParams) {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), "ignoring replace state\n      " + state + " , " + title + ", " + path + ", " + queryParams);
    };
    AppLocationStrategy.prototype.forward = function () {
    };
    AppLocationStrategy.prototype.back = function () {
    };
    var _a;
    AppLocationStrategy = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject('RunContext')),
        __metadata("design:paramtypes", [typeof (_a = typeof rc_browser_1.RunContextBrowser !== "undefined" && rc_browser_1.RunContextBrowser) === "function" ? _a : Object])
    ], AppLocationStrategy);
    return AppLocationStrategy;
}(common_1.LocationStrategy));
exports.AppLocationStrategy = AppLocationStrategy;
//# sourceMappingURL=location-strategy.js.map