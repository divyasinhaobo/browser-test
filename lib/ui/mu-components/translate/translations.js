"use strict";
/*------------------------------------------------------------------------------
   About      : Provider for translations
   
   Created on : Tue Jul 04 2017
   Author     : Sid
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mu_dictionary_1 = require("./mu-dictionary");
var dictionary_1 = require("../../../../../framework/translations/dictionary");
exports.TRANSLATIONS = new core_1.InjectionToken('translations');
exports.TRANSLATION_PROVIDERS = [
    { provide: exports.TRANSLATIONS, useValue: mergeDictionaries(mu_dictionary_1.muDictionary, dictionary_1.dictionary) },
];
function mergeDictionaries(muDictionary, dictionary) {
    Object.keys(muDictionary).forEach(function (key) {
        var value = muDictionary[key];
        if (dictionary[key])
            muDictionary[key] = Object.assign(value, dictionary[key]);
    });
    return muDictionary;
}
//# sourceMappingURL=translations.js.map