"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Sun Jun 25 2017
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
var LAST_USER = 'lastUser';
exports.USERS = 'users';
var UserKeyValue = /** @class */ (function () {
    function UserKeyValue(rc, storage) {
        this.rc = rc;
        this.storage = storage;
        this.users = {};
    }
    UserKeyValue.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users, cid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.getUserKeyValue(this.rc, exports.USERS)];
                    case 1:
                        users = _a.sent();
                        if (!users)
                            return [2 /*return*/];
                        this.users = JSON.parse(users);
                        return [4 /*yield*/, this.storage.getUserKeyValue(this.rc, LAST_USER)];
                    case 2:
                        cid = _a.sent();
                        this.lastClientId = Number(cid);
                        if (!this.lastClientId)
                            return [2 /*return*/];
                        this.deserialize(this.users[this.lastClientId]);
                        return [2 /*return*/, this];
                }
            });
        });
    };
    UserKeyValue.prototype.registerNewUser = function (clientId, userLinkId, userName) {
        return __awaiter(this, void 0, void 0, function () {
            var obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        obj = { clientId: clientId, userLinkId: userLinkId, userName: userName };
                        this.users[clientId] = obj;
                        return [4 /*yield*/, this.storage.setUserKeyValue(this.rc, exports.USERS, JSON.stringify(this.users))];
                    case 1:
                        _a.sent();
                        if (!(this.lastClientId !== clientId)) return [3 /*break*/, 3];
                        this.lastClientId = clientId;
                        return [4 /*yield*/, this.storage.setUserKeyValue(this.rc, LAST_USER, String(this.lastClientId))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        this.deserialize(obj);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserKeyValue.prototype.setScreenVisited = function (routeName) {
        if (!this.screenVisitedStates)
            this.screenVisitedStates = {};
        if (this.screenVisitedStates[routeName])
            return;
        this.screenVisitedStates[routeName] = true;
        this.rc.isStatus() && this.rc.status(this.rc.getName(this), 'visited screen', routeName);
        this.save(this.rc);
    };
    UserKeyValue.prototype.setWebProfilePicBase64 = function (rc, base64) {
        this._webProfilePicBase64 = base64;
        this.save(rc);
    };
    UserKeyValue.prototype.logOutCurrentUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userLinkId, lastClientId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.rc.isAssert() && this.rc.assert(this.rc.getName(this), this._userLinkId, 'Trying to logout a user who is not registered');
                        userLinkId = this._userLinkId;
                        delete this.users[this._clientId];
                        return [4 /*yield*/, this.storage.setUserKeyValue(this.rc, exports.USERS, JSON.stringify(this.users))];
                    case 1:
                        _a.sent();
                        if (!(Object.keys(this.users).length > 0)) return [3 /*break*/, 3];
                        lastClientId = Number(Object.keys(this.users)[0]);
                        return [4 /*yield*/, this.switchUserOnCurrRun(lastClientId)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.storage.setUserKeyValue(this.rc, LAST_USER, null)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, userLinkId];
                }
            });
        });
    };
    UserKeyValue.prototype.switchUserOnCurrRun = function (clientId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.lastClientId = clientId;
                        return [4 /*yield*/, this.storage.setUserKeyValue(this.rc, LAST_USER, String(this.lastClientId))];
                    case 1:
                        _a.sent();
                        this.deserialize(this.users[this.lastClientId]);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserKeyValue.prototype.save = function (rc) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rc.isAssert() && rc.assert(rc.getName(this), this._clientId, 'Came to save userKeyVal before clientId');
                        if (!rc.userKeyVal.userLinkId) {
                            rc.isStatus() && rc.status(rc.getName(this), "not saving rc, as user is \n        not registered " + JSON.stringify({ userLinkId: rc.userKeyVal.userLinkId }));
                            return [2 /*return*/];
                        }
                        rc.isDebug() && rc.debug(rc.getName(this), "saving rc obj " + rc);
                        this.users[this._clientId] = this.serialize();
                        return [4 /*yield*/, this.storage.setUserKeyValue(this.rc, exports.USERS, JSON.stringify(this.users))];
                    case 1:
                        _a.sent();
                        if (!(this.lastClientId !== this._clientId)) return [3 /*break*/, 3];
                        this.lastClientId = this._clientId;
                        return [4 /*yield*/, this.storage.setUserKeyValue(this.rc, LAST_USER, String(this.lastClientId))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserKeyValue.prototype.getWebProfilePicBase64 = function (clientId) {
        return this.users[clientId]['webProfilePicBase64'];
    };
    UserKeyValue.prototype.getAllClientIds = function () { return Object.keys(this.users).map(Number); };
    UserKeyValue.prototype.getAllUserLinkIds = function () {
        var ids = [];
        for (var _i = 0, _a = Object.keys(this.users); _i < _a.length; _i++) {
            var i = _a[_i];
            ids.push(this.users[i]['userLinkId']);
        }
        return ids;
    };
    UserKeyValue.prototype.getClientIdForUserLink = function (reqUserLinkId) {
        for (var clientId in this.users) {
            var userLinkId = this.users[clientId]['userLinkId'];
            if (userLinkId === reqUserLinkId)
                return Number(clientId);
        }
        return 0;
    };
    UserKeyValue.prototype.getUserInfo = function (clientId) { return this.users[clientId]; };
    Object.defineProperty(UserKeyValue.prototype, "clientId", {
        // Client Id
        get: function () { return this._clientId; },
        set: function (clientId) {
            if (clientId === this._clientId)
                return;
            if (this._clientId && this._userLinkId) {
                throw new core_1.Mubble.uError('INVALID_CLIENT_ID', 'Cannot change clientId once userLinkId is already set: ' +
                    JSON.stringify({ new: clientId, existing: this._clientId, userLinkId: this._userLinkId }));
            }
            this._clientId = clientId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserKeyValue.prototype, "userLinkId", {
        // User Link Id
        get: function () { return this._userLinkId; },
        set: function (userLinkId) {
            if (userLinkId === this._userLinkId)
                return;
            if (this._userLinkId && !userLinkId === null)
                throw new core_1.Mubble.uError('INVALID_USER_LINK_ID', 'Cannot set userLinkId when it is already set: ' + JSON.stringify({ userLinkId: userLinkId, existing: this._userLinkId }));
            this._userLinkId = userLinkId;
        },
        enumerable: true,
        configurable: true
    });
    UserKeyValue.prototype.serialize = function () {
        return {
            clientId: this._clientId,
            userLinkId: this._userLinkId,
            userName: this.userName,
            webProfilePicBase64: this._webProfilePicBase64,
            screenVisitedStates: this.screenVisitedStates
        };
    };
    UserKeyValue.prototype.deserialize = function (obj) {
        this._clientId = obj.clientId;
        this._userLinkId = obj.userLinkId;
        this.userName = obj.userName;
        this._webProfilePicBase64 = obj.webProfilePicBase64;
        this.screenVisitedStates = obj.screenVisitedStates;
    };
    UserKeyValue.prototype.$dump = function () {
        var keys = Object.getOwnPropertyNames(this);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            console.info(key + "=" + JSON.stringify(this[key]));
        }
    };
    return UserKeyValue;
}());
exports.UserKeyValue = UserKeyValue;
//# sourceMappingURL=user-key-value.js.map