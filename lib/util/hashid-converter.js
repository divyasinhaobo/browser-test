"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hashids_1 = require("hashids");
/*------------------------------------------------------------------------------
   About      : Utility class which makes use of HashIds for encrypting strings
                to hashes using a pre determined key. https://hashids.org/
   
   Created on : Thur May 24 2018
   Author     : Siddharth Garg
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
var HashidConverter = /** @class */ (function () {
    function HashidConverter() {
    }
    HashidConverter.encodeString = function (key, str) {
        var hashids = new hashids_1.default(key);
        var charCodes = [];
        for (var i = 0; i < str.length; i++) {
            var code = str.charCodeAt(i);
            charCodes.push(code);
        }
        return hashids.encode(charCodes);
    };
    HashidConverter.decodeHashids = function (key, hashid) {
        var hashids = new hashids_1.default(key);
        var charCodes = hashids.decode(hashid);
        var str = '';
        charCodes.forEach(function (charCode) {
            str += String.fromCharCode(charCode);
        });
        return str;
    };
    return HashidConverter;
}());
exports.HashidConverter = HashidConverter;
//# sourceMappingURL=hashid-converter.js.map