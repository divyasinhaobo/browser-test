"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utf8Encodings = ['utf8', 'utf-8'];
var TextEncDec = /** @class */ (function () {
    function TextEncDec(encFormat) {
        if (utf8Encodings.indexOf(encFormat) < 0 && typeof encFormat !== 'undefined' && encFormat != null) {
            throw new RangeError('Invalid encoding type. Only utf-8 is supported');
        }
    }
    TextEncDec.prototype.encode = function (str) {
        if (typeof str !== 'string') {
            throw new TypeError('passed argument must be of tye string');
        }
        var binstr = unescape(encodeURIComponent(str)), uar = new Uint8Array(binstr.length), split = binstr.split('');
        for (var i = 0; i < split.length; i++) {
            uar[i] = split[i].charCodeAt(0);
        }
        return uar;
    };
    TextEncDec.prototype.decode = function (uar) {
        if (typeof uar === 'undefined') {
            return '';
        }
        if (!ArrayBuffer.isView(uar)) {
            throw new TypeError('passed argument must be an array buffer view');
        }
        else {
            var arr = new Uint8Array(uar.buffer, uar.byteOffset, uar.byteLength), charArr = new Array(arr.length);
            for (var i = 0; i < arr.length; i++) {
                charArr[i] = String.fromCharCode(arr[i]);
            }
            return decodeURIComponent(escape(charArr.join('')));
        }
    };
    return TextEncDec;
}());
exports.TextEncDec = TextEncDec;
//# sourceMappingURL=text-enc-dec.js.map