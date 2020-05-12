"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataMasker = /** @class */ (function () {
    function DataMasker() {
    }
    DataMasker.maskData = function (maskingData, data) {
        var dataLength = data.length;
        var maskedData = null;
        var startSkipCount = maskingData.startSkipCount || 0, endSkipCount = maskingData.endSkipCount || 0, maskLength = dataLength - startSkipCount - endSkipCount;
        if ((startSkipCount + endSkipCount) > dataLength) {
            maskLength = dataLength;
            startSkipCount = 0;
            endSkipCount = 0;
        }
        if (!maskedData) {
            maskedData = data.substr(0, startSkipCount) + ("" + (maskingData.maskWith || '*')).repeat(maskLength) +
                data.substr(dataLength - endSkipCount);
        }
        return maskedData;
    };
    return DataMasker;
}());
exports.DataMasker = DataMasker;
//# sourceMappingURL=data-masker.js.map