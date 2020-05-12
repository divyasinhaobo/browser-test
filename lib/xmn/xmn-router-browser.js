"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Sun Jun 25 2017
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
var ws_browser_1 = require("./ws-browser");
var util_1 = require("../util");
var dexie_1 = require("dexie");
var findIndex_1 = require("lodash/findIndex");
var TIMEOUT_MS = 30000, SEND_RETRY_MS = 1000, SEND_TIMEOUT = 10000, EVENT_SEND_DELAY = 1000, MAX_EVENTS_TO_SEND = 5;
var XmnRouterBrowser = /** @class */ (function () {
    function XmnRouterBrowser(rc, serverUrl, ci, pubKey) {
        this.rc = rc;
        this.ongoingRequests = [];
        this.eventSubMap = {};
        // This flag indicates that events can be sent. This is to allow application to
        // have control when events are being sent. Normally, events are sent after 
        // getting client identity or login. But in background runs, events can be sent 
        // immediately
        this.lastEventTs = 0;
        this.lastEventSendTs = 0;
        var urlParser = document.createElement('a');
        urlParser.href = serverUrl;
        this.ci = ci;
        this.ci.protocol = core_1.Protocol.WEBSOCKET;
        this.ci.host = urlParser.hostname;
        this.ci.port = Number(urlParser.port) || (urlParser.protocol === 'https:' ? 443 : 80);
        var cls = Uint8Array;
        this.pubKey = cls.from(atob(pubKey), function (c) { return c.charCodeAt(0); });
        this.timerReqResend = rc.timer.register('router-resend', this.cbTimerReqResend.bind(this));
        this.timerReqTimeout = rc.timer.register('router-req-timeout', this.cbTimerReqTimeout.bind(this));
        this.timerEventTimeout = rc.timer.register('router-event-timeout', this.cbTimerEventTimeout.bind(this));
        rc.isDebug() && rc.debug(rc.getName(this), 'constructor');
    }
    XmnRouterBrowser.prototype.getPubKey = function () { return this.pubKey; };
    XmnRouterBrowser.prototype.sendRequest = function (rc, apiName, data, timeoutMS) {
        return __awaiter(this, void 0, void 0, function () {
            var timeout;
            var _this = this;
            return __generator(this, function (_a) {
                timeout = timeoutMS || TIMEOUT_MS;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var wr = new core_1.WireRequest(apiName, data, 0, resolve, reject);
                        _this.ongoingRequests.push(wr);
                        if (!_this.ci.provider)
                            _this.prepareConnection(rc);
                        if (!_this.ci.provider.send(rc, [wr])) {
                            wr._isSent = true;
                            rc.isDebug() && rc.debug(rc.getName(_this), 'sent request', wr);
                            _this.timerReqTimeout.tickAfter(timeout);
                        }
                        else {
                            rc.isStatus() && rc.status(rc.getName(_this), 'send to be retried', wr);
                            _this.timerReqResend.tickAfter(SEND_RETRY_MS);
                        }
                    })];
            });
        });
    };
    XmnRouterBrowser.prototype.sendPersistentEvent = function (rc, eventName, data) {
        return __awaiter(this, void 0, void 0, function () {
            var customData, event_1, eventTable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.ci.provider)
                            this.prepareConnection(rc);
                        customData = this.ci.customData;
                        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'sendPersistentEvent', eventName, 'customData', customData && customData.clientId);
                        this.rc.isAssert() && this.rc.assert(this.rc.getName(this), customData && customData.clientId, 'You cannot send events without clientId');
                        return [4 /*yield*/, this.initEvents()];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 4];
                        event_1 = new core_1.WireEvent(eventName, data), eventTable = new EventTable(event_1);
                        return [4 /*yield*/, eventTable.save(this.db)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.trySendingEvents(rc)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    XmnRouterBrowser.prototype.sendEphemeralEvent = function (rc, eventName, data) {
        return __awaiter(this, void 0, void 0, function () {
            var customData, event;
            return __generator(this, function (_a) {
                if (!this.ci.provider)
                    this.prepareConnection(rc);
                customData = this.ci.customData;
                this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'sendEphemeralEvent', eventName, 'customData', customData && customData.clientId);
                this.rc.isAssert() && this.rc.assert(this.rc.getName(this), customData && customData.clientId, 'You cannot send events without clientId');
                event = new core_1.WireEphEvent(eventName, data);
                this.ci.provider.sendEphemeralEvent(event);
                return [2 /*return*/];
            });
        });
    };
    XmnRouterBrowser.prototype.subscribeEvent = function (eventName, eventHandler) {
        this.rc.isAssert() && this.rc.assert(this.rc.getName(this), eventName && eventHandler);
        this.eventSubMap[eventName] = eventHandler;
    };
    XmnRouterBrowser.prototype.prepareConnection = function (rc) {
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'prepareConnection', !!this.ci.provider);
        this.ci.customData = this.getCustomData(rc);
        this.ci.customData.networkType = this.getNetworkType(rc);
        this.ci.customData.networkType = this.getLocation(rc);
        if (!this.ci.provider)
            this.ci.provider = new ws_browser_1.WsBrowser(rc, this.ci, this);
    };
    XmnRouterBrowser.prototype.initEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var customData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        customData = this.ci.customData;
                        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'initEvents', !!this.db);
                        if (!(!this.db && customData && customData.clientId)) return [3 /*break*/, 2];
                        this.db = new XmnDb(this.ci.customData.clientId);
                        return [4 /*yield*/, EventTable.removeOldByTs(this.rc, this.db, Date.now() - 7 * 24 * 3600000 /* 7 days */)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, !!this.db];
                }
            });
        });
    };
    XmnRouterBrowser.prototype.trySendingEvents = function (rc) {
        return __awaiter(this, void 0, void 0, function () {
            var arEvent, index, eventTable, wireEvent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.ci.customData.networkType || this.lastEventTs) {
                            rc.isDebug() && rc.debug(rc.getName(this), 'Skipping sending event as not ready', {
                                networkType: this.ci.customData.networkType,
                                lastEventTs: this.lastEventTs
                            });
                            return [2 /*return*/];
                        }
                        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'trySendingEvents', !!this.db);
                        return [4 /*yield*/, EventTable.getOldEvents(rc, this.db)];
                    case 1:
                        arEvent = _a.sent();
                        if (!arEvent.length)
                            return [2 /*return*/];
                        // We need to guard trigger from the timeout timer, while waiting to get data from event table, earlier trySendingEvents
                        // has succeeded
                        if (this.lastEventTs)
                            return [2 /*return*/];
                        index = 0;
                        _a.label = 2;
                    case 2:
                        if (!(index < arEvent.length)) return [3 /*break*/, 5];
                        if (!this.ci.provider)
                            this.prepareConnection(rc);
                        eventTable = arEvent[index], wireEvent = new core_1.WireEvent(eventTable.name, JSON.parse(eventTable.data), eventTable.ts);
                        if (this.ci.provider.send(rc, [wireEvent]))
                            return [3 /*break*/, 5]; // failed to send
                        rc.isDebug() && rc.debug(rc.getName(this), 'sent event', wireEvent);
                        this.lastEventTs = wireEvent.ts / 1000;
                        this.lastEventSendTs = Date.now();
                        this.timerEventTimeout.tickAfter(TIMEOUT_MS, true);
                        return [4 /*yield*/, core_1.Mubble.uPromise.delayedPromise(EVENT_SEND_DELAY)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        index++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    XmnRouterBrowser.prototype.providerReady = function () {
        return __awaiter(this, void 0, void 0, function () {
            var customData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.cbTimerReqResend();
                        customData = this.ci.customData;
                        if (!(customData && customData.clientId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.initEvents()];
                    case 1:
                        if (_a.sent())
                            this.trySendingEvents(this.rc); // not awaiting as it will introduce delay
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    XmnRouterBrowser.prototype.providerFailed = function (errCode) {
        // finishRequest removed the item from ongoingRequests array
        while (this.ongoingRequests.length) {
            var wr = this.ongoingRequests[0];
            this.finishRequest(this.rc, 0, errCode || core_1.XmnError.ConnectionFailed, null);
        }
        this.ongoingRequests = [];
        this.lastEventTs = 0;
        this.lastEventSendTs = 0;
    };
    XmnRouterBrowser.prototype.providerMessage = function (rc, arData) {
        return __awaiter(this, void 0, void 0, function () {
            var index, wo, _a, handler, eventResp, resp, index_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        index = 0;
                        _b.label = 1;
                    case 1:
                        if (!(index < arData.length)) return [3 /*break*/, 17];
                        wo = arData[index];
                        rc.isDebug() && rc.debug(rc.getName(this), "providerMessage@" + index, wo);
                        _a = wo.type;
                        switch (_a) {
                            case core_1.WIRE_TYPE.REQUEST: return [3 /*break*/, 2];
                            case core_1.WIRE_TYPE.EPH_EVENT: return [3 /*break*/, 3];
                            case core_1.WIRE_TYPE.EVENT_RESP: return [3 /*break*/, 7];
                            case core_1.WIRE_TYPE.REQ_RESP: return [3 /*break*/, 11];
                            case core_1.WIRE_TYPE.SYS_EVENT: return [3 /*break*/, 13];
                        }
                        return [3 /*break*/, 15];
                    case 2:
                        this.rc.isError() && this.rc.error(this.rc.getName(this), 'Not implemented', wo);
                        return [3 /*break*/, 16];
                    case 3:
                        handler = this.eventSubMap[wo.name];
                        if (!handler) return [3 /*break*/, 5];
                        return [4 /*yield*/, handler(rc, wo.name, wo.data)];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        util_1.EventSystem.broadcast(rc, wo.name, wo.data);
                        _b.label = 6;
                    case 6: return [3 /*break*/, 16];
                    case 7:
                        eventResp = wo;
                        rc.isAssert() && rc.assert(rc.getName(this), eventResp.ts / 1000);
                        return [4 /*yield*/, EventTable.removeOldByTs(rc, this.db, eventResp.ts / 1000)];
                    case 8:
                        _b.sent();
                        if (!(this.lastEventTs === eventResp.ts / 1000)) return [3 /*break*/, 10];
                        this.lastEventTs = 0;
                        this.lastEventSendTs = 0;
                        this.timerEventTimeout.remove();
                        return [4 /*yield*/, this.trySendingEvents(rc)];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10: return [3 /*break*/, 16];
                    case 11:
                        resp = wo;
                        index_1 = findIndex_1.default(this.ongoingRequests, { ts: resp.ts });
                        if (index_1 === -1) {
                            this.rc.isStatus() && this.rc.status(this.rc.getName(this), 'Got response for request that is not in progress... timed-out?', resp.name, 'sent at', new Date(resp.ts / 1000));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.finishRequest(this.rc, index_1, resp.errorCode, resp.errorMessage, resp.data)];
                    case 12:
                        _b.sent();
                        return [3 /*break*/, 16];
                    case 13: return [4 /*yield*/, this.processSysEvent(this.rc, wo)];
                    case 14:
                        _b.sent();
                        return [3 /*break*/, 16];
                    case 15:
                        this.rc.isError() && this.rc.error(this.rc.getName(this), 'Unknown message', wo);
                        _b.label = 16;
                    case 16:
                        index++;
                        return [3 /*break*/, 1];
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    XmnRouterBrowser.prototype.requestClose = function () {
        this.ci.provider.requestClose();
    };
    XmnRouterBrowser.prototype.processSysEvent = function (rc, se) {
        return __awaiter(this, void 0, void 0, function () {
            var newConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(se.name === core_1.SYS_EVENT.WS_PROVIDER_CONFIG)) return [3 /*break*/, 2];
                        newConfig = se.data;
                        return [4 /*yield*/, this.updateCustomData(rc, newConfig.custom)];
                    case 1:
                        _a.sent();
                        this.prepareConnection(rc);
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.ci.provider.processSysEvent(this.rc, se)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    XmnRouterBrowser.prototype.cbTimerReqResend = function () {
        var wr = this.ongoingRequests.find(function (wr) { return !wr._isSent; });
        if (!wr || !this.ci.provider)
            return 0;
        if (!this.ci.provider.send(this.rc, wr)) {
            wr._isSent = true;
            this.timerReqTimeout.tickAfter(TIMEOUT_MS);
        }
        else if ((Date.now() - wr.ts / 1000) > SEND_TIMEOUT) {
            this.finishRequest(this.rc, this.ongoingRequests.indexOf(wr), core_1.XmnError.SendTimedOut, null);
        }
        else {
            return SEND_RETRY_MS;
        }
        // We need to see if there are still messages left to be sent
        return this.ongoingRequests.find(function (wr) { return !wr._isSent; }) ? SEND_RETRY_MS : 0;
    };
    XmnRouterBrowser.prototype.cbTimerReqTimeout = function () {
        var now = Date.now();
        var nextTimeout = Number.MAX_SAFE_INTEGER;
        for (var index = 0; index < this.ongoingRequests.length; index++) {
            var wr = this.ongoingRequests[index], timeoutAt = wr.ts / 1000 + TIMEOUT_MS;
            if (wr._isSent) {
                if (now >= timeoutAt) {
                    this.finishRequest(this.rc, index--, core_1.XmnError.RequestTimedOut, null);
                }
                else {
                    if (nextTimeout > timeoutAt)
                        nextTimeout = timeoutAt;
                }
            }
        }
        return nextTimeout === Number.MAX_SAFE_INTEGER ? 0 : nextTimeout - now;
    };
    XmnRouterBrowser.prototype.cbTimerEventTimeout = function () {
        if (!this.lastEventSendTs)
            return 0;
        var diff = this.lastEventSendTs + TIMEOUT_MS - Date.now();
        if (diff > 0)
            return diff;
        this.lastEventTs = 0;
        this.lastEventSendTs = 0;
        this.trySendingEvents(this.rc);
        return TIMEOUT_MS;
    };
    XmnRouterBrowser.prototype.finishRequest = function (rc, index, errorCode, errorMessage, data) {
        var wr = this.ongoingRequests[index], now = Date.now();
        this.ongoingRequests.splice(index, 1);
        if (!wr.resolve) {
            rc.isStatus() && rc.status(rc.getName(this), 'Trying to finish already finished request', errorCode, wr.name, 'created at', new Date(wr.ts / 1000), 'timeTaken', now - wr.ts / 1000, 'ms');
            return;
        }
        if (errorCode) {
            rc.isStatus() && rc.status(rc.getName(this), 'Request failed with code', errorCode, wr.name, 'created at', new Date(wr.ts / 1000), 'timeTaken', now - wr.ts / 1000, 'ms');
            wr.reject(new core_1.Mubble.uError(errorCode, errorMessage || ''));
        }
        else {
            rc.isStatus() && rc.status(rc.getName(this), 'Request succeeded', wr.name, 'created at', new Date(wr.ts / 1000), 'timeTaken', now - wr.ts / 1000, 'ms');
            wr.resolve(data);
        }
        wr.reject = null;
        wr.resolve = null;
    };
    return XmnRouterBrowser;
}()); // end of class
exports.XmnRouterBrowser = XmnRouterBrowser;
var EventTable = /** @class */ (function () {
    function EventTable(event) {
        if (!event)
            return;
        this.ts = event.ts / 1000;
        this.name = event.name;
        this.data = JSON.stringify(event.data);
    }
    EventTable.prototype.save = function (db) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.transaction('rw', db.events, function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, db.events.put(this)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Static functions for io
     */
    EventTable.getOldEvents = function (rc, db) {
        return __awaiter(this, void 0, void 0, function () {
            var ar, arEt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.events.orderBy('ts').limit(MAX_EVENTS_TO_SEND).toArray()];
                    case 1:
                        ar = _a.sent(), arEt = ar.map(function (item) {
                            var et = new EventTable();
                            et.ts = item.ts;
                            et.name = item.name;
                            et.data = item.data;
                            return et;
                        });
                        rc.isDebug() && rc.debug(rc.getName(this), 'Retrieved events from db, count:', arEt.length);
                        return [2 /*return*/, arEt];
                }
            });
        });
    };
    EventTable.removeOldByTs = function (rc, db, ts) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.transaction('rw', db.events, function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, db.events.where('ts').belowOrEqual(ts).delete()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        rc.isDebug() && rc.debug(rc.getName(this), 'Deleted events from db with ts belowOrEqual:', ts);
                        return [2 /*return*/];
                }
            });
        });
    };
    return EventTable;
}());
// http://dexie.org/docs/Typescript.html
var XmnDb = /** @class */ (function (_super) {
    __extends(XmnDb, _super);
    function XmnDb(clientId) {
        var _this = _super.call(this, 'xmn-' + clientId) || this;
        _this.version(1).stores({
            events: 'ts'
        });
        _this.events.mapToClass(EventTable);
        return _this;
    }
    return XmnDb;
}(dexie_1.default));
//# sourceMappingURL=xmn-router-browser.js.map