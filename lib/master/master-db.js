"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
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
var dexie_1 = require("dexie");
var util_1 = require("../util");
var core_1 = require("@mubble/core");
exports.Segment = {
    version: 'version'
};
var SYNC_HASH = 'syncHashTable';
var ModelField = /** @class */ (function () {
    function ModelField(name, type, optional) {
        this.name = name;
        this.type = type;
        this.optional = optional;
    }
    ModelField.prototype.toString = function () {
        return this.name + "(" + this.type + ")" + (this.optional ? ': optional' : '');
    };
    return ModelField;
}());
dexie_1.default.debug = true;
var MasterDb = /** @class */ (function (_super) {
    __extends(MasterDb, _super);
    function MasterDb(rc, version, versionSchema) {
        var _this = _super.call(this, 'MasterDb') || this;
        _this.syncHashModels = {};
        var modelsWithKeys = Object.keys(MasterDb.schemaKey).length, modelsWithFields = Object.keys(MasterDb.schemaField).length;
        rc.isAssert() && rc.assert(rc.getName(_this), modelsWithKeys && modelsWithFields
            && modelsWithKeys >= modelsWithFields, { modelsWithKeys: modelsWithKeys, modelsWithFields: modelsWithFields });
        rc.isAssert() && rc.assert(rc.getName(_this), versionSchema[0].version === 1);
        /*
          TODO ???? validate accumulated versionSchema with this.buildSchema(schema)
        */
        versionSchema[0].tableSchema[SYNC_HASH] = 'model';
        _this.verifySegmentVersion(rc, version);
        return _this;
    }
    MasterDb.registerModelClass = function (modelName, classFn) {
        this.classMap.set(classFn, modelName);
    };
    MasterDb.getModelName = function (classFn) {
        return this.classMap.get(classFn);
    };
    MasterDb.registerSchema = function (modelName, fieldName, isPrimaryKey, fieldType, optional) {
        var field = new ModelField(fieldName, fieldType, optional), collection = isPrimaryKey ? this.schemaKey : this.schemaField;
        var fields = collection[modelName];
        if (!fields)
            fields = collection[modelName] = {};
        fields[field.name] = field;
        // console.log(`${modelName}: added ${isPrimaryKey ? 'key' : 'field'} + ${field}`)
    };
    MasterDb.prototype.init = function (rc) {
        return __awaiter(this, void 0, void 0, function () {
            var ar, modelMap, models, _loop_1, this_1, _i, models_1, modelName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this[SYNC_HASH].toArray()];
                    case 1:
                        ar = _a.sent(), modelMap = MasterDb.schemaKey, models = Object.keys(modelMap);
                        _loop_1 = function (modelName) {
                            var st = ar.find(function (item) { return item.model === modelName; });
                            this_1.syncHashModels[modelName] = st ? st.hash : { ts: 0 };
                        };
                        this_1 = this;
                        for (_i = 0, models_1 = models; _i < models_1.length; _i++) {
                            modelName = models_1[_i];
                            _loop_1(modelName);
                        }
                        rc.isDebug() && rc.debug(rc.getName(this), 'restored syncHashModels', this.syncHashModels);
                        return [2 /*return*/];
                }
            });
        });
    };
    MasterDb.prototype.onRouterAvailable = function (rc) {
        var rcb = rc;
        rcb.router.subscribeEvent(core_1.MASTER_UPDATE_EVENT, this.onMasterUpdate.bind(this));
    };
    MasterDb.prototype.getSyncRequest = function (rc) {
        rc.isAssert() && rc.assert(rc.getName(this), Object.keys(this.syncHashModels).length);
        return { hash: this.syncHashModels, segments: rc.globalKeyVal.syncSegments };
    };
    MasterDb.prototype.getTableForClass = function (rc, classFn) {
        var modelName = MasterDb.getModelName(classFn);
        rc.isAssert() && rc.assert(rc.getName(this), modelName, 'unknown class object', classFn);
        return this.getTable(rc, modelName);
    };
    MasterDb.prototype.verifySegmentVersion = function (rc, version) {
        var segments = rc.globalKeyVal.syncSegments;
        if (!segments)
            segments = {};
        if (!segments[exports.Segment.version])
            segments[exports.Segment.version] = [['']];
        var oldVersion = segments[exports.Segment.version][0][0];
        if (oldVersion !== version) {
            rc.isDebug() && rc.debug(rc.getName(this), 'version changed', { last: oldVersion, current: version });
            segments[exports.Segment.version] = [[version]];
            rc.globalKeyVal.syncSegments = segments;
        }
        else {
            rc.isDebug() && rc.debug(rc.getName(this), 'Versions are same', { last: oldVersion, current: version });
        }
    };
    MasterDb.prototype.buildSchema = function (schema) {
        var modelMap = MasterDb.schemaKey;
        for (var _i = 0, _a = Object.keys(modelMap); _i < _a.length; _i++) {
            var modelName = _a[_i];
            var ar = Object.keys(modelMap[modelName]), keyStr = ar.length === 1 ? ar[0] : "[" + ar.join('+') + "]";
            schema[modelName + 'Table'] = keyStr;
        }
    };
    MasterDb.prototype.onMasterUpdate = function (rc, eventName, data) {
        return __awaiter(this, void 0, void 0, function () {
            var syncResponse, updated, _i, _a, modelName, modelData, e_1, data_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        syncResponse = data;
                        rc.isDebug() && rc.debug(rc.getName(this), 'onMasterUpdate', JSON.stringify(syncResponse));
                        updated = false;
                        _i = 0, _a = Object.keys(syncResponse);
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        modelName = _a[_i];
                        if (!syncResponse.hasOwnProperty(modelName))
                            return [3 /*break*/, 3];
                        modelData = syncResponse[modelName];
                        return [4 /*yield*/, this.applyMasterData(rc, modelName, modelData)];
                    case 2:
                        if (_b.sent())
                            updated = true;
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (!updated) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.afterMasterUpdate(rc)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_1 = _b.sent();
                        data_1 = { errorMsg: e_1.message };
                        util_1.EventSystem.broadcast(rc, "client-error", data_1);
                        throw new Error(e_1);
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    MasterDb.prototype.applyMasterData = function (rc, modelName, modelData) {
        return __awaiter(this, void 0, void 0, function () {
            var syncHashTable;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!modelData.purge) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.clear(rc, modelName)];
                    case 1:
                        _a.sent();
                        rc.isDebug() && rc.debug(rc.getName(this), modelName, 'purged');
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(modelData.del && modelData.del.length)) return [3 /*break*/, 4];
                        rc.isDebug() && rc.debug(rc.getName(this), modelName, 'going to delete', modelData.del.length);
                        return [4 /*yield*/, this.bulkDelete(rc, modelName, modelData.del)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(modelData.mod && modelData.mod.length)) return [3 /*break*/, 6];
                        rc.isDebug() && rc.debug(rc.getName(this), modelName, 'going to upsert', modelData.mod.length);
                        return [4 /*yield*/, this.bulkPut(rc, modelName, modelData.mod)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        this.syncHashModels[modelName] = modelData.hash;
                        syncHashTable = this[SYNC_HASH];
                        return [4 /*yield*/, this.transaction('rw', syncHashTable, function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            rc.isDebug() && rc.debug(rc.getName(this), modelName, 'going to save hash', modelData.hash);
                                            return [4 /*yield*/, syncHashTable.put({ model: modelName, hash: modelData.hash })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 7:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    MasterDb.prototype.clear = function (rc, modelName) {
        return __awaiter(this, void 0, void 0, function () {
            var modelTable;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        modelTable = this.getTable(rc, modelName);
                        return [4 /*yield*/, this.transaction('rw', modelTable, function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, modelTable.clear()];
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
    //   private async bulkPut(rc: RunContextBrowser, modelName: string, arMod: object[]) {
    //     const modelTable = this.getTable(rc, modelName)
    //     try {
    //       await this.transaction('rw', modelTable, async() => {
    //       for (const modelRec of arMod) {
    //         const rec = this.buildFullRec(rc, modelName, modelRec)
    //         rc.isDebug() && rc.debug(rc.getName(this), 'going to put', rec)
    //           await modelTable.put(rec)
    //       }
    //     })
    //   } catch (err) {
    //     const x = JSON.stringify(arMod)
    //     console.log('bombed while writing', x.length, 'bytes')
    //     console.log(x)
    //     console.log('Dexie error stack', err.stack)
    //     throw(err)
    //   }
    //   console.log('wrote', JSON.stringify(arMod).length, 'bytes successfully')
    // }
    MasterDb.prototype.bulkPut = function (rc, modelName, arMod) {
        return __awaiter(this, void 0, void 0, function () {
            var modelTable, _i, arMod_1, modelRec, rec, err_1, x;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        modelTable = this.getTable(rc, modelName);
                        _i = 0, arMod_1 = arMod;
                        _a.label = 1;
                    case 1:
                        if (!(_i < arMod_1.length)) return [3 /*break*/, 6];
                        modelRec = arMod_1[_i];
                        rec = this.buildFullRec(rc, modelName, modelRec);
                        rc.isDebug() && rc.debug(rc.getName(this), 'going to put with debug ', rec);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, modelTable.put(rec)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        x = JSON.stringify(arMod);
                        console.log('bombed while writing', x.length, 'bytes');
                        console.log(x);
                        console.log('Dexie error stack', err_1.stack);
                        throw (err_1);
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6:
                        console.log('wrote', JSON.stringify(arMod).length, 'bytes successfully');
                        return [2 /*return*/];
                }
            });
        });
    };
    MasterDb.prototype.buildKeyRec = function (rc, modelName, rec) {
        var keyMap = MasterDb.schemaKey[modelName], outRec = {};
        for (var keyName in keyMap) {
            var key = keyMap[keyName];
            rc.isAssert() && rc.assert(rc.getName(this), rec[keyName] !== undefined, 'Rec missing PK', keyName, rec);
            outRec[keyName] = rec[keyName];
        }
        return outRec;
    };
    MasterDb.prototype.buildFullRec = function (rc, modelName, rec) {
        var fieldMap = MasterDb.schemaField[modelName], outRec = this.buildKeyRec(rc, modelName, rec);
        for (var fieldName in fieldMap) {
            var field = fieldMap[fieldName], value = rec[fieldName];
            rc.isAssert() && rc.assert(rc.getName(this), field.optional && value === undefined ||
                this.validateType(field.type, value), 'Invalid value for field', fieldName, rec);
            outRec[fieldName] = rec[fieldName];
        }
        return outRec;
    };
    MasterDb.prototype.validateType = function (type, value) {
        switch (type) {
            case 'string':
            case 'number':
            case 'boolean':
                return typeof (value) === type;
            case 'array':
                return Array.isArray(value);
            case 'object':
                return value && typeof (value) === type;
            default:
                return false;
        }
    };
    MasterDb.prototype.bulkDelete = function (rc, modelName, arDel) {
        return __awaiter(this, void 0, void 0, function () {
            var modelTable;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        modelTable = this.getTable(rc, modelName);
                        return [4 /*yield*/, this.transaction('rw', modelTable, function () { return __awaiter(_this, void 0, void 0, function () {
                                var _loop_2, this_2, _i, arDel_1, modelRec;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _loop_2 = function (modelRec) {
                                                var keyObj;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            keyObj = this_2.buildKeyRec(rc, modelName, modelRec);
                                                            rc.isDebug() && rc.debug(rc.getName(this_2), 'bulkDelete', modelName, keyObj);
                                                            return [4 /*yield*/, modelTable.delete(Object.keys(keyObj).map(function (key) { return keyObj[key]; }))];
                                                        case 1:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            };
                                            this_2 = this;
                                            _i = 0, arDel_1 = arDel;
                                            _a.label = 1;
                                        case 1:
                                            if (!(_i < arDel_1.length)) return [3 /*break*/, 4];
                                            modelRec = arDel_1[_i];
                                            return [5 /*yield**/, _loop_2(modelRec)];
                                        case 2:
                                            _a.sent();
                                            _a.label = 3;
                                        case 3:
                                            _i++;
                                            return [3 /*break*/, 1];
                                        case 4: return [2 /*return*/];
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
    MasterDb.prototype.getTable = function (rc, modelName) {
        var modelTable = this[modelName + 'Table'];
        rc.isAssert() && rc.assert(rc.getName(this), modelTable, 'unknown model', modelName);
        return modelTable;
    };
    // debug functions
    MasterDb.prototype.$all = function (rc, modelName) {
        return __awaiter(this, void 0, void 0, function () {
            var modelTable, ar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        modelTable = this.getTable(rc, modelName);
                        return [4 /*yield*/, modelTable.toArray()];
                    case 1:
                        ar = _a.sent();
                        console.info(ar);
                        return [2 /*return*/];
                }
            });
        });
    };
    MasterDb.schemaKey = {};
    MasterDb.schemaField = {};
    MasterDb.classMap = new Map();
    return MasterDb;
}(dexie_1.default));
exports.MasterDb = MasterDb;
//# sourceMappingURL=master-db.js.map