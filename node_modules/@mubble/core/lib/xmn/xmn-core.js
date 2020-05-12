"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Thu Jun 29 2017
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
var Protocol;
(function (Protocol) {
    Protocol[Protocol["HTTP"] = 0] = "HTTP";
    Protocol[Protocol["WEBSOCKET"] = 1] = "WEBSOCKET";
    Protocol[Protocol["HTTPS"] = 2] = "HTTPS";
    Protocol[Protocol["HTTP_THIRD"] = 3] = "HTTP_THIRD";
})(Protocol = exports.Protocol || (exports.Protocol = {}));
exports.HANDSHAKE = '__handshake__';
/* HTTP Headers */
var HTTP;
(function (HTTP) {
    // normally these keys are written with uppercase, we are writing them in lowercase 
    // for compatibility
    HTTP.HeaderKey = {
        userAgent: 'user-agent',
        clientSecret: 'x-client-secret',
        contentType: 'content-type',
        contentLength: 'content-length',
        contentEncoding: 'content-encoding',
        clientId: 'x-obopay-cid',
        versionNumber: 'x-obopay-version',
        requestTs: 'x-obopay-ts',
        symmKey: 'x-obopay-key',
        requestType: 'x-obopay-type',
        bodyEncoding: 'x-obopay-encoding',
        transferEncoding: 'transfer-encoding',
        authorization: 'authorization',
        token: 'token'
    };
    /* HTTP Headers */
    HTTP.HeaderValue = {
        form: 'application/x-www-form-urlencoded',
        stream: 'application/octet-stream',
        json: 'application/json',
        gzip: 'gzip',
        deflate: 'deflate',
        identity: 'identity',
        version2: 'v2',
        chunked: 'chunked'
    };
    HTTP.Const = {
        protocolHttp: 'http:',
        protocolHttps: 'https:'
    };
    HTTP.Method = {
        PUT: 'PUT',
        GET: 'GET',
        POST: 'POST',
        DELETE: 'DELETE'
    };
    HTTP.CurrentProtocolVersion = HTTP.HeaderValue.version2;
})(HTTP = exports.HTTP || (exports.HTTP = {}));
exports.NetworkType = {
    net2G: '2G',
    net3G: '3G',
    net4G: '4G',
    net5G: '5G',
    wifi: 'wifi',
    unknown: 'unk',
    absent: 'absent'
};
exports.WEB_SOCKET_URL = {
    ENC_PUBLIC: 'socket.io',
    ENC_PRIVATE: 'engine.io',
    PLAIN_PUBLIC: 'rocket.io',
    PLAIN_PRIVATE: 'locket.io'
};
var lastReqId = 0;
var lastEventId = 0;
exports.WIRE_TYPE = {
    REQUEST: 'REQUEST',
    EVENT: 'EVENT',
    SYS_EVENT: 'SYS_EVENT',
    EPH_EVENT: 'EPH_EVENT',
    EVENT_RESP: 'EVENT_RESP',
    REQ_RESP: 'REQ_RESP'
};
var WireObject = /** @class */ (function () {
    function WireObject(type, name, data, ts) {
        this.type = type;
        this.name = name;
        this.data = data;
        this.ts = ts || Date.now() * 1000;
    }
    WireObject.getWireObject = function (json) {
        switch (json.type) {
            case exports.WIRE_TYPE.REQUEST:
                return new WireRequest(json.name, json.data, json.ts);
            case exports.WIRE_TYPE.EVENT:
                return new WireEvent(json.name, json.data, json.ts);
            case exports.WIRE_TYPE.EPH_EVENT:
                return new WireEphEvent(json.name, json.data, json.ts);
            case exports.WIRE_TYPE.SYS_EVENT:
                return new WireSysEvent(json.name, json.data);
            case exports.WIRE_TYPE.EVENT_RESP:
                return new WireEventResp(json.name, json.ts, json.data, json.errorCode, json.errorMessage);
            case exports.WIRE_TYPE.REQ_RESP:
                return new WireReqResp(json.name, json.ts, json.data, json.errorCode, json.errorMessage);
            default:
                console.info('Error: Invalid wire object ' + JSON.stringify(json));
                return null;
        }
    };
    WireObject.parseString = function (str) {
        return JSON.parse(str);
    };
    WireObject.prototype.stringify = function () {
        return JSON.stringify(this, function (key, value) {
            return key.startsWith('_') ||
                (value && value.constructor.hasOwnProperty('byteLength')) ? undefined : value;
        });
    };
    WireObject.prototype.toString = function () {
        var err = this.error;
        return this.type + ':' + this.name + '@' + this.ts + ' ' +
            (err || JSON.stringify(this.data).substr(0, 50));
    };
    return WireObject;
}());
exports.WireObject = WireObject;
var WireRequest = /** @class */ (function (_super) {
    __extends(WireRequest, _super);
    function WireRequest(apiName, data, ts, resolve, reject) {
        var _this = _super.call(this, exports.WIRE_TYPE.REQUEST, apiName, data, ts) || this;
        _this.resolve = resolve;
        _this.reject = reject;
        _this._isSent = false;
        if (!ts) {
            if (_this.ts === lastReqId)
                _this.ts++;
            lastReqId = _this.ts;
        }
        return _this;
    }
    return WireRequest;
}(WireObject));
exports.WireRequest = WireRequest;
var WireEvent = /** @class */ (function (_super) {
    __extends(WireEvent, _super);
    function WireEvent(eventName, data, ts) {
        var _this = _super.call(this, exports.WIRE_TYPE.EVENT, eventName, data, ts) || this;
        if (!ts) {
            if (_this.ts === lastEventId)
                _this.ts++;
            lastEventId = _this.ts;
        }
        return _this;
    }
    return WireEvent;
}(WireObject));
exports.WireEvent = WireEvent;
var WireEphEvent = /** @class */ (function (_super) {
    __extends(WireEphEvent, _super);
    function WireEphEvent(eventName, data, ts) {
        return _super.call(this, exports.WIRE_TYPE.EPH_EVENT, eventName, data, ts) || this;
    }
    return WireEphEvent;
}(WireObject));
exports.WireEphEvent = WireEphEvent;
var WireReqResp = /** @class */ (function (_super) {
    __extends(WireReqResp, _super);
    function WireReqResp(name, ts, data, errorCode, errorMessage, fullErr) {
        var _this = _super.call(this, exports.WIRE_TYPE.REQ_RESP, name, data, ts) || this;
        _this.errorCode = errorCode || null;
        _this.errorMessage = errorMessage || null;
        _this._err = fullErr;
        return _this;
    }
    return WireReqResp;
}(WireObject));
exports.WireReqResp = WireReqResp;
var WireEventResp = /** @class */ (function (_super) {
    __extends(WireEventResp, _super);
    function WireEventResp(name, ts, data, errorCode, errorMessage, fullErr) {
        var _this = _super.call(this, exports.WIRE_TYPE.EVENT_RESP, name, data || {}, ts) || this;
        _this.errorCode = errorCode || null;
        _this.errorMessage = errorMessage || null;
        _this._err = fullErr;
        return _this;
    }
    return WireEventResp;
}(WireObject));
exports.WireEventResp = WireEventResp;
exports.SYS_EVENT = {
    WS_PROVIDER_CONFIG: 'WS_PROVIDER_CONFIG',
    ERROR: 'ERROR',
    PING: 'PING'
};
var WireSysEvent = /** @class */ (function (_super) {
    __extends(WireSysEvent, _super);
    function WireSysEvent(eventName, data) {
        return _super.call(this, exports.WIRE_TYPE.SYS_EVENT, eventName, data) || this;
    }
    return WireSysEvent;
}(WireObject));
exports.WireSysEvent = WireSysEvent;
exports.WssErrorCode = {
    HANDSHAKE_FAILURE: 501,
    INVALID_REQUESTTS: 502
};
exports.DataLeader = {
    BINARY: 0x01,
    DEF_JSON: 0x02,
    JSON: 0x03,
    ENC_BINARY: 0x04,
    ENC_DEF_JSON: 0x05,
    ENC_JSON: 0x06
};
exports.Encoder = {
    MIN_SIZE_TO_COMPRESS: 500
};
//# sourceMappingURL=xmn-core.js.map