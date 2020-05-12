"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Sun Jun 25 2017
   Author     : Raghvendra Varma
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.

------------------------------------------------------------------------------

- GlobalKeyValue is an automatic persistent storage system that persists the
key, values in localStorage with keys like 'global.version'.
- A field must be annotated with @GlobalKeyValue.autoStore() for making it eligible
  for automatic storage.

  - string default to ''
  - number defaults to 0
  - boolean defaults to false
  - object defaults to null

- A field can be given a different default value while declaring. Fields with default
  value, are not stored in localStorage till they are changed. Once stored they
  are never deleted

- To save changes to an object, when its internal property has changed, you will
  need to CALL detectSaveChanges(), as internal changes to object are not detected
  automatically

Design
------
- autoStore.set is called before constructor for default value initialization
  
- Last persisted value of autoStore field is kept in _fieldName. The stringified
  last persisted value is kept in _#fieldName. There is no data kept at the actual field

- ???? TODO: Write a housekeep function that will delete the unused keys

------------------------------------------------------------------------------*/
require("reflect-metadata");
var META_KEY = 'autoStore', VALID_TYPES = [String, Number, Boolean, Object];
var GlobalKeyValue = /** @class */ (function () {
    function GlobalKeyValue(rc, storage) {
        this.rc = rc;
        this.storage = storage;
    }
    GlobalKeyValue.autoStore = function () {
        return function (target, propertyKey) {
            Reflect.defineMetadata(META_KEY, true, target, propertyKey);
            return {
                get: function () {
                    var value = this['_' + propertyKey], rc = this.rc;
                    rc.isAssert() && rc.assert(rc.getName(this), value !== undefined, "You are trying to fetch " + propertyKey + "=" + value + " before init");
                    return value;
                },
                set: function (value) {
                    var fieldType = Reflect.getMetadata('design:type', target, propertyKey), rc = this['rc'];
                    rc.isDebug() && rc.debug(rc.getName(this), "autoStore.set: propertyKey: " + propertyKey + ", value: " + value + ", fieldType: " + fieldType);
                    rc.isAssert() && rc.assert(rc.getName(this), value !== undefined);
                    rc.isAssert() && rc.assert(rc.getName(this), VALID_TYPES.indexOf(fieldType) !== -1, "Not a valid propertyKey: " + propertyKey + ", fieldType: " + fieldType);
                    rc.isAssert() && rc.assert(rc.getName(this), value === null ? fieldType === Object : value.constructor === fieldType, "You are trying to set " + propertyKey + "=" + value + " with invalid type " + typeof (value));
                    var strValue = fieldType === Object ? JSON.stringify(value) : String(value);
                    var oldValue = this['_' + propertyKey];
                    // undefined indicates that GlobalKeyValue has not been initialized
                    if (oldValue === undefined) {
                        rc.isDebug() && rc.debug(rc.getName(this), "Remembering default " + propertyKey + "=" + value);
                        GlobalKeyValue.fieldMap[propertyKey] = { type: fieldType, strValue: strValue };
                        return;
                    }
                    var strOldValue = this['_$' + propertyKey], key = propertyKey;
                    if (strOldValue === strValue)
                        return;
                    this['_' + propertyKey] = value;
                    this['_$' + propertyKey] = strValue;
                    this.storage.setGlobalKeyValue(rc, key, strValue);
                    if (rc && rc.isDebug) {
                        rc.isDebug() && rc.debug('GlobalKeyValue', "Saved key " + key + "=" + strValue);
                    }
                }
            };
        };
    };
    GlobalKeyValue.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rc, _i, _a, name_1, field, strSavedValue, strDefaultValue, strValue, value;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        rc = this.rc;
                        this.extractFields(this, GlobalKeyValue.fieldMap);
                        _i = 0, _a = Object.keys(GlobalKeyValue.fieldMap);
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        name_1 = _a[_i];
                        field = GlobalKeyValue.fieldMap[name_1];
                        return [4 /*yield*/, this.storage.getGlobalKeyValue(rc, name_1)];
                    case 2:
                        strSavedValue = _b.sent(), strDefaultValue = field.strValue, strValue = strSavedValue || strDefaultValue;
                        value = void 0;
                        switch (field.type) {
                            case String:
                                value = strValue ? strValue : '';
                                break;
                            case Number:
                                value = strValue ? Number(strValue) : 0;
                                break;
                            case Boolean:
                                value = strValue ? strValue === String(true) : false;
                                break;
                            case Object:
                                value = strValue ? JSON.parse(strValue) : null;
                                break;
                        }
                        this['_' + name_1] = value;
                        this['_$' + name_1] = field.type === Object ? JSON.stringify(value) : String(value);
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, this];
                }
            });
        });
    };
    // Need to be called only for fields of type object, when some internal property
    // has been changed
    GlobalKeyValue.prototype.detectSaveChanges = function () {
        for (var _i = 0, _a = Object.keys(GlobalKeyValue.fieldMap); _i < _a.length; _i++) {
            var name_2 = _a[_i];
            var field = GlobalKeyValue.fieldMap[name_2], type = field.type.name;
            if (field.type !== Object)
                continue;
            this[name_2] = this[name_2]; // forces the set function to get called
        }
    };
    GlobalKeyValue.prototype.extractFields = function (proto, fieldz) {
        if (proto === null)
            return;
        var keys = Object.getOwnPropertyNames(proto);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (fieldz[key])
                continue;
            try {
                if (Reflect.getMetadata(META_KEY, proto, key)) {
                    // console.log('GlobalKeyValue:extractFields()', key)
                    fieldz[key] = { type: Reflect.getMetadata('design:type', proto, key) };
                }
            }
            catch (err) {
                console.info('GlobalKeyValue:extractFields()', 'failed for', key);
            }
        }
        return this.extractFields(Object.getPrototypeOf(proto), fieldz);
    };
    GlobalKeyValue.prototype.$dump = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, name_3, field, type, memory, store;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = Object.keys(GlobalKeyValue.fieldMap);
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        name_3 = _a[_i];
                        field = GlobalKeyValue.fieldMap[name_3], type = field.type.name, memory = this[name_3];
                        return [4 /*yield*/, this.storage.getGlobalKeyValue(this.rc, name_3)];
                    case 2:
                        store = _b.sent();
                        console.info({ name: name_3, type: type, memory: memory, store: store });
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GlobalKeyValue.fieldMap = {};
    __decorate([
        GlobalKeyValue.autoStore(),
        __metadata("design:type", Object)
    ], GlobalKeyValue.prototype, "syncSegments", void 0);
    __decorate([
        GlobalKeyValue.autoStore(),
        __metadata("design:type", String)
    ], GlobalKeyValue.prototype, "jsVersion", void 0);
    __decorate([
        GlobalKeyValue.autoStore(),
        __metadata("design:type", Number)
    ], GlobalKeyValue.prototype, "logLevel", void 0);
    return GlobalKeyValue;
}());
exports.GlobalKeyValue = GlobalKeyValue;
//# sourceMappingURL=global-key-value.js.map