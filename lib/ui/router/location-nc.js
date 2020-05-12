"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Wed Jul 12 2017
   Author     : Raghvendra Varma
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
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
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var rc_browser_1 = require("../../rc-browser");
var NcPlatformLocation = /** @class */ (function (_super) {
    __extends(NcPlatformLocation, _super);
    function NcPlatformLocation(rc) {
        var _this = _super.call(this) || this;
        _this.rc = rc;
        rc.setupLogger(_this, 'NcPlatformLocation');
        return _this;
        // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'constructor()')
    }
    Object.defineProperty(NcPlatformLocation.prototype, "location", {
        get: function () {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'get location()');
            return location;
        },
        enumerable: true,
        configurable: true
    });
    NcPlatformLocation.prototype.getState = function () {
    };
    NcPlatformLocation.prototype.getBaseHrefFromDOM = function () {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'getBaseHrefFromDOM()');
        return '.';
    };
    NcPlatformLocation.prototype.onPopState = function (fn) {
        // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onPopState() ignored')
        // window.addEventListener('popstate', fn, false);
    };
    NcPlatformLocation.prototype.onHashChange = function (fn) {
        // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onHashChange() ignored')
        // window.addEventListener('hashchange', fn, false);
    };
    Object.defineProperty(NcPlatformLocation.prototype, "hostname", {
        get: function () {
            return location.hostname;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NcPlatformLocation.prototype, "port", {
        get: function () {
            return location.port;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NcPlatformLocation.prototype, "href", {
        get: function () {
            return location.href;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NcPlatformLocation.prototype, "protocol", {
        get: function () {
            return location.protocol;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NcPlatformLocation.prototype, "pathname", {
        get: function () {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'get pathname()');
            return location.pathname;
        },
        set: function (newPath) {
            // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'set pathname()')
            // location.pathname = newPath 
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NcPlatformLocation.prototype, "search", {
        get: function () {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'get search()');
            return location.search;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NcPlatformLocation.prototype, "hash", {
        get: function () {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'get hash()');
            return location.hash;
        },
        enumerable: true,
        configurable: true
    });
    NcPlatformLocation.prototype.pushState = function (state, title, url) {
        this.rc.isAssert() && this.rc.assert(this.rc.getName(this), false, 'pushState', 'First navigation was not done in root ngInit()');
    };
    NcPlatformLocation.prototype.replaceState = function (state, title, url) {
        this.rc.isAssert() && this.rc.assert(this.rc.getName(this), false, 'replaceState', 'First navigation was not done in root ngInit()');
    };
    NcPlatformLocation.prototype.forward = function () {
        // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'forward()')
        // history.forward()
    };
    NcPlatformLocation.prototype.back = function () {
        // this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'back()')
        // history.back()
    };
    NcPlatformLocation = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject('RunContext')),
        __metadata("design:paramtypes", [rc_browser_1.RunContextBrowser])
    ], NcPlatformLocation);
    return NcPlatformLocation;
}(common_1.PlatformLocation));
exports.NcPlatformLocation = NcPlatformLocation;
//# sourceMappingURL=location-nc.js.map