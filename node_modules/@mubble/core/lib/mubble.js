"use strict";
/*------------------------------------------------------------------------------
   About      : Common stuff for all Mubble Projects
   
   Created on : Wed Jul 19 2017
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
Object.defineProperty(exports, "__esModule", { value: true });
var Mubble;
(function (Mubble) {
    Mubble.Lang = {
        English: 'en',
        Hindi: 'hi',
        Kannada: 'kn'
    };
    var uError = /** @class */ (function (_super) {
        __extends(uError, _super);
        function uError(code, msg) {
            var _this = _super.call(this, msg) || this;
            _this.code = code;
            return _this;
        }
        return uError;
    }(Error));
    Mubble.uError = uError;
    var uPromise = /** @class */ (function () {
        function uPromise() {
            var _this = this;
            this.promise = new Promise(function (resolve, reject) {
                _this.fnResolve = resolve;
                _this.fnReject = reject;
                _this.fulfilled = false;
            });
        }
        uPromise.execFn = function (fn, context) {
            var params = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                params[_i - 2] = arguments[_i];
            }
            var promiseFn = this.getFn(fn, context);
            return promiseFn.apply(void 0, params);
        };
        uPromise.delayedPromise = function (ms, fulfillWith) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () { return resolve(fulfillWith); }, ms);
            });
        };
        uPromise.getFn = function (fn, context) {
            return function () {
                var arParam = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arParam[_i] = arguments[_i];
                }
                return new Promise(function (resolve, reject) {
                    function cb() {
                        var arCbParam = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            arCbParam[_i] = arguments[_i];
                        }
                        var err = arCbParam.shift();
                        if (err)
                            return reject(err);
                        // Resolved with multiple values; this would actually give first value in promise
                        resolve.apply(null, arCbParam);
                    }
                    try {
                        arParam.push(cb);
                        fn.apply(context, arParam);
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            };
        };
        // Executes a function sync and return promise for chaining
        uPromise.prototype.execute = function (cb) {
            cb(this);
            return this;
        };
        uPromise.prototype.resolve = function (result) {
            if (this.fnResolve) {
                this.fnResolve(result);
                this.cleanup();
            }
        };
        uPromise.prototype.reject = function (err) {
            if (this.fnReject) {
                this.fnReject(err);
                this.cleanup();
            }
        };
        uPromise.prototype.isFulfilled = function () {
            return this.fulfilled;
        };
        uPromise.prototype.cleanup = function () {
            this.fnResolve = null;
            this.fnReject = null;
            this.fulfilled = true;
        };
        return uPromise;
    }());
    Mubble.uPromise = uPromise;
})(Mubble = exports.Mubble || (exports.Mubble = {}));
//# sourceMappingURL=mubble.js.map