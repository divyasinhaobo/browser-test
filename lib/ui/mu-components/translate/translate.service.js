"use strict";
/*------------------------------------------------------------------------------
   About      : Single instance translation service injected on app level
   
   Created on : Tue Jul 04 2017
   Author     : Sid
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var rc_browser_1 = require("../../../rc-browser");
var core_1 = require("@angular/core");
var translations_1 = require("./translations");
var core_2 = require("@mubble/core");
var PLACEHOLDER = '%';
var TranslateService = /** @class */ (function () {
    function TranslateService(rc, _translations) {
        this.rc = rc;
        this._translations = _translations;
        this.defaultLang = core_2.Mubble.Lang.English;
        this.fallback = true;
    }
    TranslateService.prototype.getCurrentLanguage = function () {
        return this.currentLang || this.defaultLang;
    };
    TranslateService.prototype.setDefaultLanguage = function (lang) {
        this.defaultLang = lang;
    };
    TranslateService.prototype.enableFallback = function (enable) {
        this.fallback = enable;
    };
    TranslateService.prototype.use = function (lang) {
        this.currentLang = lang;
    };
    TranslateService.prototype.translate = function (key) {
        var translation = key;
        // found in current language
        if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
            return this._translations[this.currentLang][key];
        }
        // fallback disabled
        if (!this.fallback) {
            return translation;
        }
        // found in default language
        if (this._translations[this.defaultLang] && this._translations[this.defaultLang][key]) {
            return this._translations[this.defaultLang][key];
        }
        return translation;
    };
    TranslateService.prototype.addTranslations = function (langObj, lang) {
        Object.assign(this._translations[lang], langObj);
    };
    TranslateService.prototype.instant = function (key, words) {
        var translation = this.translate(key);
        if (!words)
            return translation;
        return this.replace(translation, words);
    };
    TranslateService.prototype.replace = function (word, words) {
        if (word === void 0) { word = ''; }
        if (words === void 0) { words = ''; }
        var translation = word;
        var values = [].concat(words);
        values.forEach(function (e, i) {
            translation = translation.replace(PLACEHOLDER.concat(i), e);
        });
        return translation;
    };
    TranslateService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject('RunContext')),
        __param(1, core_1.Inject(translations_1.TRANSLATIONS)),
        __metadata("design:paramtypes", [rc_browser_1.RunContextBrowser, Object])
    ], TranslateService);
    return TranslateService;
}());
exports.TranslateService = TranslateService;
//# sourceMappingURL=translate.service.js.map