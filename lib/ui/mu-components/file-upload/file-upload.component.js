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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var core_1 = require("@angular/core");
var trackable_screen_1 = require("../../../ui/router/trackable-screen");
var translate_1 = require("../translate");
exports.PERMISSION = {
    CAMERA: 'CAMERA'
};
var FileUploadComponent = /** @class */ (function () {
    /*rc type is any since it is of type RuncontextApp and it is app specific
      and should not be imported here
    */
    function FileUploadComponent(rc, translate) {
        this.rc = rc;
        this.translate = translate;
        this.value = new core_1.EventEmitter();
    }
    FileUploadComponent.prototype.ngOnInit = function () {
    };
    FileUploadComponent.prototype.ngAfterViewInit = function () {
        if (this.rc.bridge.isRunningInBrowser()) {
            if (this.uploadFileCont)
                this.uploadFileCont.nativeElement.addEventListener('change', this.onFileUpload.bind(this));
        }
    };
    /*=====================================================================
                                PRIVATE
    =====================================================================*/
    FileUploadComponent.prototype.onFileUpload = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var file, errorText, warnText, base64, strippedBase64, uploadDoc, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        file = event.target.files[0];
                        if (!file.type.includes('image')) {
                            errorText = this.translate.instant('upl_invalid_mime_type');
                            this.rc.uiRouter.showToast(errorText);
                            return [2 /*return*/];
                        }
                        if (file.size > 512000) {
                            warnText = this.translate.instant('upl_max_size_err');
                            this.rc.uiRouter.showToast(warnText);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.rc.utils.getBase64(file)];
                    case 1:
                        base64 = _b.sent(), strippedBase64 = base64.replace("data:" + file.type + ";base64,", '');
                        _a = {
                            base64: strippedBase64,
                            mimeType: file.type
                        };
                        return [4 /*yield*/, this.rc.utils.getCheckSum(strippedBase64)];
                    case 2:
                        uploadDoc = (_a.checksum = _b.sent(),
                            _a);
                        if (!this.uploadedDocParams)
                            this.uploadedDocParams = {};
                        this.uploadedDocParams = uploadDoc;
                        this.uploadFileCont.nativeElement.value = null;
                        return [2 /*return*/];
                }
            });
        });
    };
    FileUploadComponent.prototype.updatePicture = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resp, uploadDoc, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.rc.bridge.takePictureFromCamera()];
                    case 1:
                        resp = _b.sent();
                        if (!resp['success']) {
                            this.rc.uiRouter.showToast(this.translate.instant('mu_fil_upl_unknow_err'));
                            return [2 /*return*/];
                        }
                        _a = {
                            base64: resp['base64'],
                            mimeType: resp['mimeType']
                        };
                        return [4 /*yield*/, this.rc.utils.getCheckSum(resp['base64'])];
                    case 2:
                        uploadDoc = (_a.checksum = _b.sent(),
                            _a);
                        if (!this.uploadedDocParams)
                            this.uploadedDocParams = {};
                        this.uploadedDocParams = uploadDoc;
                        if (this.eventPropagate) {
                            this.onSubmit();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /*=====================================================================
                                HTML
    =====================================================================*/
    FileUploadComponent.prototype.takePicture = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.rc.bridge.isRunningInBrowser())
                            return [2 /*return*/];
                        return [4 /*yield*/, this.rc.bridge.getPermission(exports.PERMISSION.CAMERA, false)];
                    case 1:
                        resp = _a.sent();
                        if (!resp.permGiven) {
                            return [2 /*return*/];
                        }
                        this.rc.bridge(exports.PERMISSION.CAMERA).then(function (permResp) {
                            if (permResp.permGiven)
                                _this.updatePicture();
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    FileUploadComponent.prototype.uploadFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var event_1, docObj, uploadDoc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.rc.bridge.isRunningInBrowser()) {
                            event_1 = new MouseEvent('click', { bubbles: false });
                            this.uploadFileCont.nativeElement.dispatchEvent(event_1);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.rc.bridge.selectDocumentFile()];
                    case 1:
                        docObj = _a.sent();
                        if (docObj['error'])
                            return [2 /*return*/];
                        if (!docObj['base64']) {
                            this.rc.uiRouter.showToast(this.translate.instant('cmn_toast_err_unknown'));
                            return [2 /*return*/];
                        }
                        uploadDoc = {
                            base64: docObj['base64'],
                            checksum: docObj['checksum'],
                            mimeType: docObj['mimeType']
                        };
                        if (!this.uploadedDocParams)
                            this.uploadedDocParams = {};
                        this.uploadedDocParams = uploadDoc;
                        if (this.eventPropagate) {
                            this.onSubmit();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FileUploadComponent.prototype.onSubmit = function () {
        if (this.isRequired && (!this.uploadedDocParams || !Object.keys(this.uploadedDocParams).length)) {
            this.rc.uiRouter.showToast(this.translate.instant('mu_fil_upl_upload_err'));
        }
        else {
            this.value.emit(this.uploadedDocParams);
        }
    };
    var _a, _b;
    __decorate([
        core_1.ViewChild('uploadFileCont', { static: false }),
        __metadata("design:type", typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _a : Object)
    ], FileUploadComponent.prototype, "uploadFileCont", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", trackable_screen_1.TrackableScreen)
    ], FileUploadComponent.prototype, "screen", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FileUploadComponent.prototype, "eventPropagate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FileUploadComponent.prototype, "isRequired", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_b = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _b : Object)
    ], FileUploadComponent.prototype, "value", void 0);
    FileUploadComponent = __decorate([
        core_1.Component({
            selector: 'file-upload',
            templateUrl: './file-upload.component.html',
            styleUrls: ['./file-upload.component.scss']
        }),
        __param(0, core_1.Inject('RunContext')),
        __metadata("design:paramtypes", [Object, translate_1.TranslateService])
    ], FileUploadComponent);
    return FileUploadComponent;
}());
exports.FileUploadComponent = FileUploadComponent;
//# sourceMappingURL=file-upload.component.js.map