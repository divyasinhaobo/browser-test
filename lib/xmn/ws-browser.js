"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Mon Apr 17 2017
   Author     : Raghvendra Varma
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.

  Ping: Ping indicates to the server that client is up and kicking....
  Websocket carries ephemeral events too. Design of Ping also helps in carrying
  ephemeral events. This is the reason we don't tick timer when we receive
  messages from the server

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
var enc_provider_browser_1 = require("./enc-provider-browser");
var PING_SECS = 29, TOLERANCE_SECS = 5, RFRSH_LAST_REQ_SECS = 60;
var WsBrowser = /** @class */ (function () {
    function WsBrowser(rc, ci, router) {
        this.rc = rc;
        this.ci = ci;
        this.router = router;
        this.socketCreateTs = 0;
        this.lastMessageTs = 0;
        this.sending = false;
        this.configured = false;
        this.connExpired = false;
        this.lastRequestTs = 0;
        this.ephemeralEvents = [];
        rc.setupLogger(this, 'WsBrowser');
        this.timerPing = rc.timer.register('ws-ping', this.cbTimerPing.bind(this));
        this.lastRequestTimer = rc.timer.register('ws-request', this.cbRequestTimer.bind(this));
        rc.isDebug() && rc.debug(rc.getName(this), 'constructor');
    }
    WsBrowser.prototype.uiArToB64 = function (ar) {
        return btoa(String.fromCharCode.apply(String, ar));
    };
    WsBrowser.prototype.sendEphemeralEvent = function (event) {
        this.rc.isAssert() && this.rc.assert(this.rc.getName(this), this.ci.provider);
        if (this.ephemeralEvents.length >= 20) {
            this.rc.isWarn() && this.rc.warn(this.rc.getName(this), 'Too many ephemeralEvents. Sizing to 20');
            while (this.ephemeralEvents.length >= 20)
                this.ephemeralEvents.shift();
        }
        this.ephemeralEvents.push(event);
    };
    WsBrowser.prototype.send = function (rc, data) {
        var ws = this.ws;
        if (this.sending ||
            (ws && (ws.readyState !== WebSocket.OPEN || !this.configured || ws.bufferedAmount))) {
            rc.isStatus() && rc.status(rc.getName(this), 'Websocket is not ready right now', {
                anotherSendInProgress: this.sending,
                configured: this.configured,
                readyState: this.ws ? this.ws.readyState : 'to be created',
                bufferedAmount: this.ws.bufferedAmount
            });
            return core_1.XmnError._NotReady;
        }
        var objects = Array.isArray(data) ? data : [data];
        if (this.ephemeralEvents.length) {
            objects.push.apply(objects, this.ephemeralEvents);
            this.ephemeralEvents.length = 0;
        }
        this.sendInternal(rc, objects);
        return null;
    };
    WsBrowser.prototype.requestClose = function () {
        var ws = this.ws;
        if (ws && ws.readyState !== WebSocket.CLOSED)
            ws.close();
    };
    WsBrowser.prototype.sendInternal = function (rc, data) {
        return __awaiter(this, void 0, void 0, function () {
            var messageBody, _a, _b, url, header, wireObjIsOfReq;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.sending = true;
                        if (!!this.ws) return [3 /*break*/, 6];
                        this.pendingMessage = data;
                        if (!!this.encProvider) return [3 /*break*/, 2];
                        this.encProvider = new enc_provider_browser_1.EncryptionBrowser(rc, this.ci, this.router.getPubKey());
                        return [4 /*yield*/, this.encProvider.init()];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        if (!!this.wsProviderConfig) return [3 /*break*/, 4];
                        _a = this;
                        _b = {
                            pingSecs: PING_SECS,
                            maxOpenSecs: this.router.getMaxOpenSecs(),
                            toleranceSecs: TOLERANCE_SECS
                        };
                        return [4 /*yield*/, this.encProvider.getSyncKeyB64()];
                    case 3:
                        _a.wsProviderConfig = (_b.key = _c.sent(),
                            _b.custom = this.ci.customData,
                            _b);
                        _c.label = 4;
                    case 4:
                        url = (this.ci.port === 443 ? 'wss' : 'ws') + "://" + this.ci.host + ":" + this.ci.port + "/" + core_1.HANDSHAKE + "/" + this.ci.protocolVersion + "/" + this.ci.shortName + "/";
                        return [4 /*yield*/, this.encProvider.encodeHeader(this.wsProviderConfig)];
                    case 5:
                        header = _c.sent();
                        messageBody = encodeURIComponent(header);
                        this.ws = new WebSocket(url + messageBody);
                        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Opened socket with url', url + messageBody);
                        this.ws.binaryType = 'arraybuffer';
                        this.ws.onopen = this.onOpen.bind(this);
                        this.ws.onmessage = this.onMessage.bind(this);
                        this.ws.onclose = this.onClose.bind(this);
                        this.ws.onerror = this.onError.bind(this);
                        this.socketCreateTs = Date.now();
                        return [3 /*break*/, 8];
                    case 6:
                        if (!this.isConnWithinPing(Date.now())) { // Connection expired
                            rc.isDebug() && rc.debug(rc.getName(this), "Connection expired..requesting Socket close.");
                            this.sending = false;
                            this.connExpired = true;
                            this.requestClose();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.encProvider.encodeBody(data)];
                    case 7:
                        messageBody = _c.sent();
                        this.ws.send(messageBody);
                        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Sent message', { msgLen: messageBody.length,
                            messages: data.length, firstMsg: data[0].name });
                        _c.label = 8;
                    case 8:
                        wireObjIsOfReq = data.some(function (wireObject) { return wireObject.type === core_1.WIRE_TYPE.REQUEST; });
                        if (wireObjIsOfReq && this.router.canStrtLastReqTimer(this.rc)) {
                            this.setLastReqTimer(rc);
                        }
                        this.setupTimer(rc);
                        this.sending = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    WsBrowser.prototype.onOpen = function () {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'onOpen() in', Date.now() - this.socketCreateTs, 'ms');
        this.router.providerReady();
    };
    WsBrowser.prototype.onMessage = function (msgEvent) {
        return __awaiter(this, void 0, void 0, function () {
            var data, messages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = msgEvent.data;
                        return [4 /*yield*/, this.encProvider.decodeBody(data)];
                    case 1:
                        messages = _a.sent();
                        return [4 /*yield*/, this.router.providerMessage(this.rc, messages)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WsBrowser.prototype.onError = function (err) {
        this.rc.isWarn() && this.rc.warn(this.rc.getName(this), 'Websocket onError()', err);
        if (this.ci.provider) {
            this.cleanup();
            this.router.providerFailed();
        }
    };
    WsBrowser.prototype.onClose = function () {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'Websocket onClose()');
        if (this.ci.provider) {
            this.cleanup();
            this.router.providerFailed(this.connExpired ? core_1.XmnError._ConnectionExpired : null);
        }
    };
    WsBrowser.prototype.processSysEvent = function (rc, se) {
        return __awaiter(this, void 0, void 0, function () {
            var config, msPingSecs, errMsg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(se.name === core_1.SYS_EVENT.WS_PROVIDER_CONFIG)) return [3 /*break*/, 5];
                        config = se.data, msPingSecs = config.pingSecs;
                        this.rc.isAssert() && this.rc.assert(this.rc.getName(this), msPingSecs && Number.isInteger(msPingSecs), msPingSecs);
                        Object.assign(this.wsProviderConfig, config);
                        if (!config.key) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.encProvider.setNewKey(config.key)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'First message in', Date.now() - this.socketCreateTs, 'ms');
                        this.configured = true;
                        if (!this.pendingMessage) return [3 /*break*/, 4];
                        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), "Sending Pending Message...");
                        return [4 /*yield*/, this.send(this.rc, this.pendingMessage)];
                    case 3:
                        _a.sent();
                        this.pendingMessage = null;
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        if (se.name === core_1.SYS_EVENT.ERROR) {
                            errMsg = se.data;
                            rc.isWarn() && rc.warn(rc.getName(this), 'processSysEvent', errMsg);
                            if (this.ci.provider) {
                                this.cleanup();
                                this.router.providerFailed(errMsg.code);
                            }
                        }
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    WsBrowser.prototype.isConnWithinPing = function (requestTs) {
        var wsConfig = this.wsProviderConfig, pingTh = this.lastMessageTs + (wsConfig.pingSecs + wsConfig.toleranceSecs) * 1000, openTh = this.socketCreateTs + (wsConfig.maxOpenSecs - wsConfig.toleranceSecs) * 1000;
        return requestTs < pingTh && requestTs < openTh;
    };
    WsBrowser.prototype.setLastReqTimer = function (rc) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.lastRequestTs = Date.now();
                        this.lastRequestTimer.tickAfter(RFRSH_LAST_REQ_SECS * 1000, true);
                        if (!!this.sessionTimedoutSecs) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.router.getSessionTimeOutSecs(rc)];
                    case 1:
                        _a.sessionTimedoutSecs = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    WsBrowser.prototype.setupTimer = function (rc) {
        this.lastMessageTs = Date.now();
        this.timerPing.tickAfter(this.wsProviderConfig.pingSecs * 1000, true);
    };
    WsBrowser.prototype.cbRequestTimer = function () {
        if (!this.ci.provider)
            return 0;
        var now = Date.now(), diff = now - this.lastRequestTs;
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), "cbRequestTimer " + diff + ", " + this.sessionTimedoutSecs);
        if (diff >= (this.sessionTimedoutSecs * 1000)) {
            this.rc.isDebug() && this.rc.debug(this.rc.getName(this), "Session timed out. Closing session");
            this.router.sessionTimedOut(this.rc);
            this.requestClose();
            return RFRSH_LAST_REQ_SECS * 1000;
        }
        return diff;
    };
    WsBrowser.prototype.cbTimerPing = function () {
        if (!this.ci.provider)
            return 0;
        var now = Date.now(), diff = this.lastMessageTs + this.wsProviderConfig.pingSecs * 1000 - now;
        if (diff <= 0) {
            this.send(this.rc, [new core_1.WireSysEvent(core_1.SYS_EVENT.PING, {})]);
            return this.wsProviderConfig.pingSecs * 1000;
        }
        return diff;
    };
    WsBrowser.prototype.cleanup = function () {
        if (!this.ci.provider)
            return;
        try {
            this.timerPing.remove();
            this.lastRequestTimer.remove();
            this.encProvider = null;
            this.ci.provider = null;
            if (this.ws)
                this.ws.close();
            this.ws = null;
        }
        catch (e) { }
    };
    return WsBrowser;
}());
exports.WsBrowser = WsBrowser;
//# sourceMappingURL=ws-browser.js.map