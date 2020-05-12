"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*------------------------------------------------------------------------------
   About      : Url sanitizer
   
   Created on : Sat Nov 03 2018
   Author     : Sid
   
   Copyright (c) 2018 Obopay. All rights reserved.
------------------------------------------------------------------------------*/
var hashid_converter_1 = require("./hashid-converter");
var UrlHelper = /** @class */ (function () {
    function UrlHelper() {
    }
    UrlHelper.getUrlParams = function (genericUrl) {
        var idx = genericUrl.indexOf('?');
        if (idx === -1)
            return null;
        var url = genericUrl.substring(idx + 1);
        var queries = url.split('&');
        var params = {};
        for (var i = 0; i < queries.length; i++) {
            var split = queries[i].split('=');
            params[split[0]] = split[1];
        }
        return params;
    };
    UrlHelper.decodeStringFromHashids = function (key, hashids) {
        return hashid_converter_1.HashidConverter.decodeHashids(key, hashids);
    };
    UrlHelper.encodeStringAsHashids = function (key, hashids) {
        return hashid_converter_1.HashidConverter.encodeString(key, hashids);
    };
    return UrlHelper;
}());
exports.UrlHelper = UrlHelper;
//# sourceMappingURL=url-helper.js.map