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
Object.defineProperty(exports, "__esModule", { value: true });
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Mon Apr 17 2017
   Author     : Raghvendra Varma
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
var core_1 = require("@mubble/core");
var CONSOLE_FN_MAP = [];
CONSOLE_FN_MAP[core_1.LOG_LEVEL.DEBUG] = console.log;
CONSOLE_FN_MAP[core_1.LOG_LEVEL.STATUS] = console.info || console.log;
CONSOLE_FN_MAP[core_1.LOG_LEVEL.WARN] = console.warn || console.log;
CONSOLE_FN_MAP[core_1.LOG_LEVEL.ERROR] = console.error || console.log;
var core_2 = require("@mubble/core");
exports.LOG_LEVEL = core_2.LOG_LEVEL;
exports.RUN_MODE = core_2.RUN_MODE;
var InitConfigBrowser = /** @class */ (function (_super) {
    __extends(InitConfigBrowser, _super);
    function InitConfigBrowser(runMode, logLevel, tzMin) {
        var _this = _super.call(this, logLevel, logLevel !== core_1.LOG_LEVEL.NONE, tzMin) || this;
        if ((runMode === core_1.RUN_MODE.PROD || runMode === core_1.RUN_MODE.PRE_PROD) && logLevel !== core_1.LOG_LEVEL.NONE) {
            console.log('You must turn off logging in production mode');
        }
        return _this;
    }
    return InitConfigBrowser;
}(core_1.InitConfig));
exports.InitConfigBrowser = InitConfigBrowser;
var RunStateBrowser = /** @class */ (function (_super) {
    __extends(RunStateBrowser, _super);
    function RunStateBrowser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RunStateBrowser;
}(core_1.RunState));
exports.RunStateBrowser = RunStateBrowser;
var RCBrowserLogger = /** @class */ (function (_super) {
    __extends(RCBrowserLogger, _super);
    function RCBrowserLogger(rc) {
        var _this = _super.call(this, rc) || this;
        _this.rc = rc;
        return _this;
    }
    RCBrowserLogger.prototype.logToConsole = function (level, logStr) {
        var fn = CONSOLE_FN_MAP[level];
        fn.call(console, logStr);
    };
    return RCBrowserLogger;
}(core_1.RCLoggerBase));
exports.RCBrowserLogger = RCBrowserLogger;
var RunContextBrowser = /** @class */ (function (_super) {
    __extends(RunContextBrowser, _super);
    // Stores the old error handler
    // private oldOnError    : any
    function RunContextBrowser(initConfig, runState, contextId, contextName) {
        var _this = _super.call(this, initConfig, runState, contextId, contextName) || this;
        _this.initConfig = initConfig;
        _this.runState = runState;
        return _this;
    }
    // Called only once in the lifetime of app during app load
    RunContextBrowser.prototype.init = function () {
        _super.prototype.init.call(this);
        this.lang = core_1.Mubble.Lang.English;
        this.logger = new RCBrowserLogger(this);
        // this.oldOnError = window.onerror
        // window.onerror  = this.onError.bind(this)
    };
    RunContextBrowser.prototype.clone = function (newRc) {
        _super.prototype.clone.call(this, newRc);
    };
    return RunContextBrowser;
}(core_1.RunContextBase));
exports.RunContextBrowser = RunContextBrowser;
//# sourceMappingURL=rc-browser.js.map