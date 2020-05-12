"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Mon Jun 26 2017
   Author     : Raghvendra Varma
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@mubble/core");
var text_enc_dec_1 = require("./text-enc-dec");
var IV = new Uint8Array([0x01, 0x00, 0x03, 0x00, 0x01, 0x00, 0x00, 0x00,
    0x01, 0x00, 0x09, 0x00, 0x07, 0x00, 0x00, 0x00]), SYM_ALGO = { name: "AES-CBC", iv: IV, length: 256 }, ASYM_ALGO = { name: 'RSA-OAEP', hash: { name: 'SHA-1' } };
var arShortCode;
var arUniqueId;
var pwc;
var EncryptionBrowser = /** @class */ (function () {
    function EncryptionBrowser(rc, ci, rsaPubKey) {
        this.rc = rc;
        this.ci = ci;
        this.rsaPubKey = rsaPubKey;
        rc.setupLogger(this, 'EncryptionBrowser');
        if (!arShortCode)
            this.extractShortCode(rc, ci.shortName);
        if (!arUniqueId)
            this.extractUniqueId(rc, ci.customData.uniqueId);
        if (!pwc)
            pwc = new PakoWorkerClient(rc);
    }
    EncryptionBrowser.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, crypto.subtle.generateKey(SYM_ALGO, true, ['encrypt', 'decrypt'])];
                    case 1:
                        _a.syncKey = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EncryptionBrowser.prototype.encodeHeader = function (wsConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var now, tsBuffer, encTs, tsB64, keyBuffer, encKey, keyB64, configBuffer, encConfig, configB64;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = Date.now() * 1000;
                        return [4 /*yield*/, this.encrypt(this.strToUnit8Ar(now.toString()))];
                    case 1:
                        tsBuffer = _a.sent(), encTs = new Uint8Array(tsBuffer), tsB64 = btoa(String.fromCharCode.apply(String, encTs));
                        return [4 /*yield*/, this.encryptSymKey()];
                    case 2:
                        keyBuffer = _a.sent(), encKey = new Uint8Array(keyBuffer), keyB64 = btoa(String.fromCharCode.apply(String, encKey));
                        return [4 /*yield*/, this.encrypt(this.strToUnit8Ar(JSON.stringify(wsConfig)))];
                    case 3:
                        configBuffer = _a.sent(), encConfig = new Uint8Array(configBuffer), configB64 = btoa(String.fromCharCode.apply(String, encConfig));
                        return [2 /*return*/, "" + tsB64 + keyB64 + configB64];
                }
            });
        });
    };
    EncryptionBrowser.prototype.encryptSymKey = function () {
        return __awaiter(this, void 0, void 0, function () {
            var buffer, key, encKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, crypto.subtle.exportKey('raw', this.syncKey)];
                    case 1:
                        buffer = _a.sent();
                        return [4 /*yield*/, crypto.subtle.importKey('spki', this.rsaPubKey, ASYM_ALGO, false, ['encrypt'])];
                    case 2:
                        key = _a.sent();
                        return [4 /*yield*/, crypto.subtle.encrypt(ASYM_ALGO, key, buffer)];
                    case 3:
                        encKey = _a.sent();
                        return [2 /*return*/, encKey];
                }
            });
        });
    };
    EncryptionBrowser.prototype.encrypt = function (ar) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, crypto.subtle.encrypt(SYM_ALGO, this.syncKey, ar)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EncryptionBrowser.prototype.decrypt = function (ar) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, crypto.subtle.decrypt(SYM_ALGO, this.syncKey, ar)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EncryptionBrowser.prototype.getArrayBuffer = function (ar) {
        if (ar.byteOffset === 0 && ar.byteLength === ar.buffer.byteLength)
            return ar.buffer;
        return ar.buffer.slice(ar.byteOffset, ar.byteOffset + ar.byteLength);
    };
    EncryptionBrowser.prototype.encodeBody = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var str, firstPassArray, leader, deflate, ar, secondPassArray, arOut, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        str = this.stringifyWireObjects(data);
                        leader = -1, deflate = false;
                        if (!(str.length > core_1.Encoder.MIN_SIZE_TO_COMPRESS)) return [3 /*break*/, 2];
                        return [4 /*yield*/, pwc.deflate(str)];
                    case 1:
                        ar = _b.sent();
                        if (ar.length < str.length) {
                            firstPassArray = ar;
                            deflate = true;
                        }
                        _b.label = 2;
                    case 2:
                        if (!firstPassArray) {
                            firstPassArray = this.strToUnit8Ar(str);
                        }
                        _a = Uint8Array.bind;
                        return [4 /*yield*/, this.encrypt(firstPassArray)];
                    case 3:
                        secondPassArray = new (_a.apply(Uint8Array, [void 0, _b.sent()]))(), arOut = new Uint8Array(secondPassArray.byteLength + 1);
                        leader = deflate ? core_1.DataLeader.ENC_DEF_JSON : core_1.DataLeader.ENC_JSON;
                        arOut.set([leader]);
                        arOut.set(secondPassArray, 1);
                        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'encodeBody', {
                            first: data[0].name,
                            messages: data.length,
                            json: str.length,
                            wire: arOut.byteLength,
                            encrypted: true,
                            compressed: deflate,
                        });
                        return [2 /*return*/, arOut];
                }
            });
        });
    };
    EncryptionBrowser.prototype.stringifyWireObjects = function (objects) {
        var strArray = objects.map(function (wm) { return wm.stringify(); });
        return "[" + strArray.join(', ') + "]";
    };
    EncryptionBrowser.prototype.decodeBody = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var inAr, ar, leader, temp, _a, arData, index, decLen, deflated, newLineCode, jsonStr, wo, outAr, inJsonStr, inJson, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        inAr = new Uint8Array(data, 1), ar = new Uint8Array(data, 0, 1), leader = ar[0];
                        _a = Uint8Array.bind;
                        return [4 /*yield*/, this.decrypt(inAr)];
                    case 1:
                        temp = new (_a.apply(Uint8Array, [void 0, _c.sent()]))();
                        deflated = false;
                        if (!(leader === core_1.DataLeader.BINARY)) return [3 /*break*/, 2];
                        newLineCode = '\n'.charCodeAt(0);
                        for (index = 0; index < temp.length; index++)
                            if (temp[index] === newLineCode)
                                break;
                        jsonStr = String.fromCharCode.apply(String, temp.slice(0, index)), wo = core_1.WireObject.getWireObject(JSON.parse(jsonStr)), outAr = temp.slice(index + 1);
                        wo.data = outAr;
                        arData = [wo];
                        decLen = outAr.byteLength;
                        return [3 /*break*/, 6];
                    case 2:
                        deflated = leader === core_1.DataLeader.DEF_JSON || leader === core_1.DataLeader.ENC_DEF_JSON;
                        if (!deflated) return [3 /*break*/, 4];
                        return [4 /*yield*/, pwc.inflate(temp)];
                    case 3:
                        _b = _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _b = this.uint8ArToStr(temp);
                        _c.label = 5;
                    case 5:
                        inJsonStr = _b, inJson = JSON.parse(inJsonStr);
                        decLen = inJsonStr.length;
                        arData = Array.isArray(inJson) ? inJson : [inJsonStr];
                        for (index = 0; index < arData.length; index++) {
                            arData[index] = core_1.WireObject.getWireObject(JSON.parse(arData[index]));
                        }
                        _c.label = 6;
                    case 6:
                        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'decodeBody', {
                            first: arData[0].name,
                            messages: arData.length,
                            wire: data.byteLength,
                            message: decLen,
                            encrypted: leader === core_1.DataLeader.ENC_JSON || leader === core_1.DataLeader.ENC_BINARY || leader === core_1.DataLeader.ENC_DEF_JSON, compressed: leader === core_1.DataLeader.BINARY ? 'binary' : deflated
                        });
                        return [2 /*return*/, arData];
                }
            });
        });
    };
    EncryptionBrowser.prototype.setNewKey = function (syncKey) {
        return __awaiter(this, void 0, void 0, function () {
            var arEncNewKey, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        arEncNewKey = this.binToUnit8Ar(atob(syncKey));
                        _a = this;
                        return [4 /*yield*/, crypto.subtle.importKey('raw', arEncNewKey, SYM_ALGO, true, ['encrypt', 'decrypt'])];
                    case 1:
                        _a.syncKey = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EncryptionBrowser.prototype.getSyncKeyB64 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var buffer, arr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, crypto.subtle.exportKey('raw', this.syncKey)];
                    case 1:
                        buffer = _a.sent(), arr = new Uint8Array(buffer);
                        return [2 /*return*/, btoa(String.fromCharCode.apply(String, arr))];
                }
            });
        });
    };
    EncryptionBrowser.prototype.binToUnit8Ar = function (binStr) {
        var cls = Uint8Array;
        return cls.from(binStr, function (c) { return c.charCodeAt(0); });
    };
    EncryptionBrowser.prototype.strToUnit8Ar = function (str) {
        var TextEncoder = window.TextEncoder;
        return TextEncoder ? new TextEncoder('utf-8').encode(str) : new text_enc_dec_1.TextEncDec('utf-8').encode(str);
    };
    EncryptionBrowser.prototype.uint8ArToStr = function (uar) {
        var TextDecoder = window.TextDecoder;
        return TextDecoder ? new TextDecoder('utf-8').decode(uar) : new text_enc_dec_1.TextEncDec('utf-8').decode(uar);
    };
    EncryptionBrowser.prototype.extractShortCode = function (rc, code) {
        rc.isAssert() && rc.assert(rc.getName(this), code.length <= 4);
        arShortCode = new Uint8Array(4);
        for (var index = 0; index < code.length; index++) {
            var str = code.charAt(index);
            rc.isAssert() && rc.assert(rc.getName(this), str.match(/[a-zA-Z0-9]/));
            arShortCode[index] = str.charCodeAt(0) - 40;
        }
    };
    EncryptionBrowser.prototype.extractUniqueId = function (rc, id) {
        var ar = id.split('.').map(function (i) { return Number(i); });
        if (ar.length > 1) {
            rc.isAssert() && rc.assert(rc.getName(this), ar.length === 3 &&
                !isNaN(ar[0]) && !isNaN(ar[1]) && !isNaN(ar[2]));
        }
        else {
            var num = Number(ar[0]);
            rc.isAssert() && rc.assert(rc.getName(this), !isNaN(num) && num <= 999999);
            ar[2] = num % 100;
            num = Math.floor(num / 100);
            ar[1] = num % 100;
            ar[0] = Math.floor(num / 100);
        }
        arUniqueId = Uint8Array.from(ar);
    };
    return EncryptionBrowser;
}());
exports.EncryptionBrowser = EncryptionBrowser;
var AsyncRequest = /** @class */ (function () {
    function AsyncRequest(apiName) {
        var _this = this;
        this.apiName = apiName;
        this.requestId = AsyncRequest.nextRequestId++;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
    }
    AsyncRequest.nextRequestId = 1;
    return AsyncRequest;
}());
var PakoWorkerClient = /** @class */ (function () {
    function PakoWorkerClient(rc) {
        this.rc = rc;
        this.reqMap = {};
        var worker = this.worker = new Worker('js/pwc.js');
        worker.onmessage = this.onMessage.bind(this);
    }
    PakoWorkerClient.prototype.inflate = function (inU8Array) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendMessage('inflate', inU8Array, { to: 'string' })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PakoWorkerClient.prototype.deflate = function (str) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendMessage('deflate', str)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PakoWorkerClient.prototype.sendMessage = function (apiName) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var asyncRequest = new AsyncRequest(apiName);
        this.reqMap[asyncRequest.requestId] = asyncRequest;
        this.worker.postMessage([asyncRequest.requestId, apiName].concat(params));
        return asyncRequest.promise;
    };
    PakoWorkerClient.prototype.onMessage = function (event) {
        var _a = event.data, reqId = _a[0], resp = _a.slice(1);
        var asyncRequest = this.reqMap[reqId];
        this.rc.isAssert() && this.rc.assert(this.rc.getName(this), asyncRequest);
        delete this.reqMap[reqId];
        asyncRequest.resolve.apply(asyncRequest, resp);
    };
    return PakoWorkerClient;
}());
//# sourceMappingURL=enc-provider-browser.js.map