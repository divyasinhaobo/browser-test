"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Tue Apr 11 2017
   Author     : Raghvendra Varma
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
var date_1 = require("./util/date");
var timer_1 = require("./util/timer");
var omit_1 = __importDefault(require("lodash/omit"));
var keysIn_1 = __importDefault(require("lodash/keysIn"));
// first index is dummy
var LEVEL_CHARS = ['', '', '', '*** ', '!!! '];
var LOG_LEVEL;
(function (LOG_LEVEL) {
    LOG_LEVEL[LOG_LEVEL["DEBUG"] = 1] = "DEBUG";
    LOG_LEVEL[LOG_LEVEL["STATUS"] = 2] = "STATUS";
    LOG_LEVEL[LOG_LEVEL["WARN"] = 3] = "WARN";
    LOG_LEVEL[LOG_LEVEL["ERROR"] = 4] = "ERROR";
    LOG_LEVEL[LOG_LEVEL["NONE"] = 5] = "NONE";
})(LOG_LEVEL = exports.LOG_LEVEL || (exports.LOG_LEVEL = {}));
var RUN_MODE;
(function (RUN_MODE) {
    RUN_MODE[RUN_MODE["DEV"] = 0] = "DEV";
    RUN_MODE[RUN_MODE["QA"] = 1] = "QA";
    RUN_MODE[RUN_MODE["PRE_PROD"] = 2] = "PRE_PROD";
    RUN_MODE[RUN_MODE["PROD"] = 3] = "PROD";
    RUN_MODE[RUN_MODE["LOAD"] = 4] = "LOAD";
})(RUN_MODE = exports.RUN_MODE || (exports.RUN_MODE = {}));
var ExternalLogger = /** @class */ (function () {
    function ExternalLogger() {
    }
    return ExternalLogger;
}());
exports.ExternalLogger = ExternalLogger;
var InitConfig = /** @class */ (function () {
    function InitConfig(logLevel, consoleLogging, tzMin, externalLogger) {
        this.logLevel = logLevel;
        this.consoleLogging = consoleLogging;
        this.tzMin = tzMin;
        this.externalLogger = externalLogger;
        this.runMode = RUN_MODE.DEV;
    }
    return InitConfig;
}());
exports.InitConfig = InitConfig;
var RunState = /** @class */ (function () {
    function RunState() {
        this.moduleLLMap = {};
        this.modLogLevel = LOG_LEVEL.NONE;
        this.moduleNameMap = new WeakMap();
    }
    return RunState;
}());
exports.RunState = RunState;
var RunContextBase = /** @class */ (function () {
    function RunContextBase(initConfig, runState, contextId, contextName) {
        this.initConfig = initConfig;
        this.runState = runState;
        this.contextId = contextId;
        this.contextName = contextName;
    }
    // Called only once in the lifetime of execution during initialization
    RunContextBase.prototype.init = function () {
        this.timer = new timer_1.Timer();
    };
    RunContextBase.prototype.clone = function (newRcb) {
        newRcb.initConfig = this.initConfig;
        newRcb.runState = this.runState;
        newRcb.timer = this.timer;
        /*
        if (newRcb.contextId === this.contextId && newRcb.contextName === this.contextName) {
          newRcb.logger.lastLogTS = this.logger.lastLogTS
          newRcb.startTs   = this.startTs
        }*/
    };
    RunContextBase.prototype.finish = function (ic, resp, req, apiName) {
        this.logger.finish(ic, resp, req, apiName);
    };
    RunContextBase.prototype.setupLogger = function (obj, moduleName, logLevel) {
        this.runState.moduleNameMap.set(obj, moduleName);
        if (this.initConfig.logLevel !== LOG_LEVEL.NONE && logLevel !== undefined) {
            this.runState.moduleLLMap[moduleName] = logLevel;
            var keys = Object.keys(this.runState.moduleLLMap);
            this.runState.modLogLevel = LOG_LEVEL.NONE;
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                if (this.runState.moduleLLMap[key] < this.runState.modLogLevel) {
                    this.runState.modLogLevel = this.runState.moduleLLMap[key];
                }
            }
        }
    };
    RunContextBase.prototype.getGlobalLogLevel = function () {
        return this.initConfig.logLevel;
    };
    RunContextBase.prototype.setGlobalLogLevel = function (logLevel) {
        this.initConfig.logLevel = logLevel;
    };
    RunContextBase.prototype.getLogLevel = function () {
        return this.initConfig.logLevel > this.runState.modLogLevel ?
            this.runState.modLogLevel : this.initConfig.logLevel;
    };
    /**
     * Tries to figure out the name of the context
     * @param obj: this
     */
    RunContextBase.prototype.getName = function (obj) {
        return obj ? (this.runState.moduleNameMap.get(obj) || obj.name ||
            (obj.constructor ? obj.constructor.name : '?')) : '?';
    };
    RunContextBase.prototype.isDebug = function () {
        return this.getLogLevel() <= LOG_LEVEL.DEBUG;
    };
    RunContextBase.prototype.isStatus = function () {
        return this.getLogLevel() <= LOG_LEVEL.STATUS;
    };
    RunContextBase.prototype.isWarn = function () {
        return this.getLogLevel() <= LOG_LEVEL.WARN;
    };
    RunContextBase.prototype.isError = function () {
        return this.getLogLevel() <= LOG_LEVEL.ERROR;
    };
    RunContextBase.prototype.isAssert = function () {
        return this.initConfig.runMode !== RUN_MODE.PROD;
    };
    RunContextBase.prototype.debug = function (moduleName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.logger.log(moduleName, LOG_LEVEL.DEBUG, args);
    };
    RunContextBase.prototype.status = function (moduleName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.logger.log(moduleName, LOG_LEVEL.STATUS, args);
    };
    RunContextBase.prototype.warn = function (moduleName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.logger.log(moduleName, LOG_LEVEL.WARN, args);
    };
    RunContextBase.prototype.error = function (moduleName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.logger.log(moduleName, LOG_LEVEL.ERROR, args);
    };
    RunContextBase.prototype.assert = function (moduleName, condition) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (!condition) {
            args.unshift('Assertion failed!');
            throw (new Error(this.logger.log(moduleName, LOG_LEVEL.ERROR, args)));
        }
    };
    RunContextBase.prototype.hasLogged = function () {
        return this.logger.lastLogTS !== 0;
    };
    return RunContextBase;
}());
exports.RunContextBase = RunContextBase;
// Replacer Function to take Care of cyclic object references
function safeReplacerFn() {
    var seen = [];
    return function (key, value) {
        if (value != null && typeof value == "object") {
            if (seen.indexOf(value) >= 0) {
                return;
            }
            seen.push(value);
        }
        return value;
    };
}
exports.safeReplacerFn = safeReplacerFn;
var RCLoggerBase = /** @class */ (function () {
    function RCLoggerBase(rc) {
        this.rc = rc;
        this.sesLogCache = [];
        this.lastLogTS = 0;
        this.sessionContext = false;
        this.startTs = Date.now();
        // Trace related
        this.k = 0;
        this.traceSpans = {};
        this.finishedTraceSpans = [];
        this.ignoreTrace = false;
    }
    RCLoggerBase.prototype.finish = function (ic, er, req, apiName) {
        // default Implementation .
    };
    RCLoggerBase.prototype.startTraceSpan = function (id) {
        if (!this.traceSpans[id]) {
            this.traceSpans[id] = { startTime: Date.now(), endTime: 0 };
        }
        else {
            // already unfinished span exists
            this.k += 1;
            var mId = id + '-' + this.k;
            // create new span with id + count
            this.traceSpans[mId] = { startTime: Date.now(), endTime: 0 };
            return this.k; // return duplicate count
        }
        return;
    };
    RCLoggerBase.prototype.endTraceSpan = function (id, ackNumber) {
        if (this.ignoreTrace) {
            this.rc.isWarn() && this.rc.warn(this.rc.getName(this), 'IgnoreTrace set. Ignoring trace ', id, ackNumber);
            return;
        }
        var mId = ackNumber ? id + '-' + ackNumber : id, startTime = this.traceSpans[mId] ? this.traceSpans[mId].startTime : 0;
        if (startTime) {
            this.finishedTraceSpans.push({ id: id, startTime: startTime, endTime: Date.now() });
            delete this.traceSpans[mId];
        }
        else {
            this.rc.isError() && this.rc.error(this.rc.getName(this), new Error('Start span not called'));
            throw new Error('Start span not called, Id: ' + id + ' ' + ackNumber);
        }
    };
    RCLoggerBase.prototype.getWorkerIdentifier = function () {
        return null;
    };
    RCLoggerBase.prototype.log = function (moduleName, level, args) {
        var _this = this;
        // args  = JSON.parse(JSON.stringify(args))
        var refLogLevel = this.rc.runState.moduleLLMap[moduleName] || this.rc.initConfig.logLevel;
        if (level < refLogLevel)
            return 'not logging';
        if (!this.rc.initConfig.consoleLogging && !this.rc.initConfig.externalLogger)
            return 'not logging';
        var curDate = new Date(), dateStr = date_1.format(curDate, '%dd%/%mm% %hh%:%MM%:%ss%.%ms%', this.rc.initConfig.tzMin), durStr = this.durationStr(curDate.getTime());
        var buffer = args.reduce(function (buf, val) {
            var strVal;
            if (val instanceof Error) {
                // Error.name typically has class name of the ErrorCLass like EvalError
                // Error.message has the user readable message, this is also included in the stack
                strVal = val.stack || "Error " + val.name + ": " + val.message + " (no stack)";
                var errObj = omit_1.default(val, ['message']);
                if (keysIn_1.default(errObj).length) {
                    strVal = _this.objectToString(errObj, 5) + ' ' + strVal;
                }
                if (val.message && strVal.indexOf(val.message) == -1) {
                    // case when stack does not contain the message
                    strVal = val.message + ' ' + strVal;
                }
            }
            else if (val && (typeof (val) === 'object')) {
                strVal = _this.objectToString(val, 2);
            }
            else {
                strVal = String(val).trim();
            }
            return buf ? buf + ' ' + strVal : strVal;
        }, '');
        if (!this.rc.initConfig.consoleLogging && buffer.length > 500)
            buffer = buffer.substr(0, 500);
        var workerIdentifer = this.getWorkerIdentifier() || '', logStr = this.rc.contextId ?
            "" + LEVEL_CHARS[level] + dateStr + " " + durStr + " [" + this.rc.contextId + "][" + workerIdentifer + "] " + moduleName + "(" + this.rc.contextName + "): " + buffer :
            "" + LEVEL_CHARS[level] + dateStr + " " + durStr + " [" + workerIdentifer + "] " + moduleName + ": " + buffer;
        if (this.rc.initConfig.consoleLogging) {
            this.logToConsole(level, logStr);
        }
        if (this.rc.initConfig.externalLogger) {
            if (this.sessionContext) {
                this.sesLogCache.push({
                    ts: Date.now(),
                    moduleName: moduleName,
                    level: level,
                    log: buffer
                });
            }
            else {
                this.rc.initConfig.externalLogger.log(level, logStr);
            }
        }
        return buffer;
    };
    RCLoggerBase.prototype.durationStr = function (ts) {
        var ms = ts - this.lastLogTS;
        if (!this.lastLogTS) {
            this.lastLogTS = ts;
            return '---';
        }
        this.lastLogTS = ts;
        if (ms < 10)
            return '  ' + ms;
        if (ms < 100)
            return ' ' + ms;
        if (ms < 1000)
            return ms.toString();
        if (ms < 10000)
            return (ms / 1000).toFixed(1);
        return '+++';
    };
    RCLoggerBase.prototype.objectToString = function (obj, maxLevels, pendingLevels) {
        var isArray = Array.isArray(obj), isSet = obj instanceof Set, isMap = obj instanceof Map, MAX_KEYS = 20;
        var buffer = '', str, value, len, valType, keys, keyLength;
        if (pendingLevels === undefined)
            pendingLevels = maxLevels;
        if (isSet || isMap) {
            keys = obj.keys();
            keyLength = obj.size;
        }
        else {
            keys = Object.keys(obj);
            keyLength = keys.length;
        }
        if (typeof (obj) === 'function') {
            var fn = obj;
            return maxLevels === pendingLevels ? fn.toString() : 'function ' + fn.name;
        }
        //console.log(`obj: ${obj} ,${typeof(obj)}, ${obj.toString()} , ${typeof(obj.toString())}`)
        if (!isArray && typeof (obj.toString) === 'function') {
            var rc = this.rc;
            // if (rc.getMaskingData) {
            //   const maskKeys  = rc.getMaskingData() as MaskingDataParams[]
            //   if (maskKeys && maskKeys.length) {
            //     for (const key in obj) {
            //       maskKeys.forEach(val => {
            //         if (val.maskKey === key) {
            //           obj[key]  = DataMasker.maskData(val, obj[key])
            //         }
            //       })
            //     }
            //   }
            // }
            var str_1 = obj.toString();
            if (typeof (str_1) === 'number' || (typeof (str_1) === 'string' && !str_1.startsWith('[object')))
                return str_1;
        }
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
            if (buffer)
                buffer += ', ';
            if (key === String(MAX_KEYS) && keyLength - MAX_KEYS > 1) {
                buffer += (keyLength - MAX_KEYS) + ' more...';
                break;
            }
            if (!isArray && !isSet)
                buffer += key + ':';
            value = isSet ? key : (isMap ? obj.get(key) : obj[key]);
            valType = typeof (value);
            if (valType === 'function') {
                str = value.name;
                buffer += str ? str + '()' : value.toString().substr(0, 50);
            }
            else if ((!value) || (valType !== 'object')) {
                try {
                    str = String(JSON.stringify(value));
                }
                catch (error) {
                    // Take care of circular Objects
                    str = String(JSON.stringify(value, safeReplacerFn()));
                }
                buffer += str.length > 50 ? str.substr(0, 50) + '..' : str;
            }
            else {
                if (!pendingLevels) {
                    if (Array.isArray(value)) {
                        len = value.length;
                        buffer += '[' + (len ? len + 'x' : '') + ']';
                    }
                    else {
                        len = Object.keys(value).length;
                        buffer += '{' + (len ? len + 'x' : '') + '}';
                    }
                }
                else {
                    buffer += this.objectToString(value, maxLevels, pendingLevels - 1);
                }
            }
        }
        return isArray || isSet ? '[' + buffer + ']' : '{' + buffer + '}';
    };
    return RCLoggerBase;
}());
exports.RCLoggerBase = RCLoggerBase;
//# sourceMappingURL=rc-base.js.map