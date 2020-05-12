"use strict";
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
var core_1 = require("../../core");
var url_helper_1 = require("./url-helper");
var BaseUtility = /** @class */ (function () {
    function BaseUtility() {
    }
    BaseUtility.prototype.expandTemplate = function (template, data) {
        return core_1.expandTemplate(template, data);
    };
    BaseUtility.prototype.expandTemplateObj = function (templateObj, data) {
        return core_1.expandTemplateObj(templateObj, data);
    };
    BaseUtility.prototype.parseURLForRouter = function (parser) {
        if (parser.protocol !== 'http' || parser.protocol !== 'https') {
            parser.href = parser.href.replace(/.*\:\/\//, 'http://');
        }
        var searchObject = {}, queries = parser.search.replace(/^\?/, '').split('&');
        for (var i = 0; i < queries.length; i++) {
            if (!queries[i])
                continue;
            var split = queries[i].split('=');
            searchObject[split[0]] = decodeURIComponent(split[1]);
        }
        var pathname = parser.pathname.startsWith('/')
            ? parser.pathname.substring(1)
            : parser.pathname;
        return {
            protocol: parser.protocol,
            host: parser.host,
            hostname: parser.hostname,
            port: parser.port,
            pathname: pathname,
            search: parser.search,
            searchObject: searchObject,
            hash: parser.hash
        };
    };
    BaseUtility.prototype.getUrlParams = function (genericUrl) {
        return url_helper_1.UrlHelper.getUrlParams(genericUrl);
    };
    BaseUtility.prototype.getErrorScreenState = function (errorMessage) {
        var errorCode;
        switch (errorMessage) {
            case core_1.XmnError.NetworkNotPresent:
                errorCode = 'NoNet';
                break;
            case core_1.XmnError.ConnectionFailed:
                errorCode = 'ConnFail';
                break;
            case core_1.XmnError.RequestTimedOut:
            case core_1.XmnError.SendTimedOut:
                errorCode = 'TimedOut';
                break;
            case core_1.XmnError.UnAuthorized:
                errorCode = 'UnAuthorized';
            default:
                errorCode = errorMessage.substring(0, Math.min(32, errorMessage.length));
        }
        return errorCode;
    };
    BaseUtility.prototype.getBase64 = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function () { return resolve(reader.result); };
                        reader.onerror = function (error) { return reject(error); };
                    })];
            });
        });
    };
    BaseUtility.prototype.getCheckSum = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var encoder, data, buffer, hexString;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        encoder = new TextEncoder(), data = encoder.encode(message);
                        return [4 /*yield*/, window.crypto.subtle.digest('SHA-256', data)];
                    case 1:
                        buffer = _a.sent(), hexString = this.hexString(buffer);
                        return [2 /*return*/, hexString];
                }
            });
        });
    };
    BaseUtility.prototype.hexString = function (buffer) {
        var byteArray = new Uint8Array(buffer);
        var hexCode = '', value;
        for (var i = 0; i < byteArray.length; i++) {
            value = byteArray[i].toString(16),
                hexCode += (value.length === 1 ? '0' + value : value);
        }
        return hexCode;
    };
    BaseUtility.prototype.getCompressedImage = function (file, changeOrientation) {
        if (changeOrientation === void 0) { changeOrientation = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function (readerEvent) {
                            var image = new Image();
                            image.src = readerEvent.target.result;
                            image.onload = function (imageEvent) {
                                var exif = window['EXIF'];
                                if (exif) {
                                    exif.getData(file, function () {
                                        var orientation = changeOrientation ? file.exifdata.Orientation : undefined;
                                        return resolve(_this.getCanvasImage(image, orientation));
                                    });
                                }
                                else {
                                    return resolve(_this.getCanvasImage(image));
                                }
                            };
                        };
                        reader.onerror = function (error) { return reject(error); };
                    })];
            });
        });
    };
    BaseUtility.prototype.getCanvasImage = function (image, orientation) {
        var canvas = document.createElement('canvas'), ctx = canvas.getContext('2d'), maxSize = 800;
        var width = image.width, height = image.height;
        if (width > height) {
            if (width > maxSize) {
                height *= maxSize / width;
                width = maxSize;
            }
        }
        else if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
        }
        canvas.width = width;
        canvas.height = height;
        if (orientation) {
            if (orientation > 4) {
                canvas.width = height;
                canvas.height = width;
            }
            switch (orientation) {
                case 2:
                    ctx.translate(width, 0);
                    ctx.scale(-1, 1);
                    break;
                case 3:
                    ctx.translate(width, height);
                    ctx.rotate(Math.PI);
                    break;
                case 4:
                    ctx.translate(0, height);
                    ctx.scale(1, -1);
                    break;
                case 5:
                    ctx.rotate(0.5 * Math.PI);
                    ctx.scale(1, -1);
                    break;
                case 6:
                    ctx.rotate(0.5 * Math.PI);
                    ctx.translate(0, -height);
                    break;
                case 7:
                    ctx.rotate(0.5 * Math.PI);
                    ctx.translate(width, -height);
                    ctx.scale(-1, 1);
                    break;
                case 8:
                    ctx.rotate(-0.5 * Math.PI);
                    ctx.translate(-width, 0);
                    break;
            }
        }
        ctx.drawImage(image, 0, 0, width, height);
        ctx.restore();
        var backgroundColor = 'white';
        var compositeOperation = ctx.globalCompositeOperation;
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = compositeOperation;
        var resizedImage = canvas.toDataURL('image/jpeg', 0.7);
        return resizedImage;
    };
    //base64 without mime type
    BaseUtility.prototype.getBase64Size = function (base64) {
        var slicedBase64 = base64.includes('base64') ? base64.split(',')[1] : base64;
        var padding = 0;
        if (slicedBase64.endsWith('==')) {
            padding = 2;
        }
        else if (slicedBase64.endsWith('=')) {
            padding = 1;
        }
        var size = (slicedBase64.length * (0.75)) - padding;
        return (size / 1024);
    };
    return BaseUtility;
}());
exports.BaseUtility = BaseUtility;
//# sourceMappingURL=utility.js.map