"use strict";
/*------------------------------------------------------------------------------
   About      : Replacement of input-container. Ranges are not handled as of now
   
   Created on : Fri Mar 06 2020
   Author     : Aditya Baddur
   
   Copyright (c) 2020 Obopay. All rights reserved.
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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var trackable_screen_1 = require("../../router/trackable-screen");
var rc_browser_1 = require("../../../rc-browser");
var material_1 = require("@angular/material");
var input_validator_1 = require("../input-container/input-validator");
var operators_1 = require("rxjs/operators");
var file_upload_component_1 = require("../file-upload/file-upload.component");
var app_server_interfaces_1 = require("@mubble/core/interfaces/app-server-interfaces");
var MuFormContainerComponent = /** @class */ (function () {
    function MuFormContainerComponent(rc, formBuilder, changeRef) {
        this.rc = rc;
        this.formBuilder = formBuilder;
        this.changeRef = changeRef;
        this.eventPropagate = false;
        this.displayLabel = true;
        this.value = new core_1.EventEmitter();
        this.dropdownOpen = new core_1.EventEmitter();
        this.lastInpField = new core_1.EventEmitter();
        this.inputForm = {};
        this.DISPLAY_TYPE = app_server_interfaces_1.DISPLAY_TYPE;
        this.DISPLAY_MODE = app_server_interfaces_1.DISPLAY_MODE;
        this.inputForm = this.formBuilder.group({});
    }
    MuFormContainerComponent.prototype.ngOnChanges = function () {
        this.initialize();
    };
    MuFormContainerComponent.prototype.ngOnInit = function () {
        this.initialize();
    };
    MuFormContainerComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.inputContainers = _this.inputCont.toArray().map(function (val) { return val.nativeElement; });
        }, 10);
    };
    /*=====================================================================
                                UTILS
    =====================================================================*/
    MuFormContainerComponent.prototype.onSubmit = function () {
        for (var _i = 0, _a = this.formParams.inputParams; _i < _a.length; _i++) {
            var inputParams = _a[_i];
            if (this.inputForm && (inputParams.validators || inputParams.isRequired))
                this.inputForm.get(inputParams.id).markAsTouched();
        }
        if (this.hasError())
            return;
        var formOutputParams = {};
        for (var _b = 0, _c = this.formParams.inputParams; _b < _c.length; _b++) {
            var inputParams = _c[_b];
            var params = void 0;
            switch (inputParams.displayType) {
                case app_server_interfaces_1.DISPLAY_TYPE.CALENDAR_BOX:
                    params = {
                        value: this.inputForm.get(inputParams.id).value.getTime(),
                        displayType: inputParams.displayType
                    };
                    break;
                case app_server_interfaces_1.DISPLAY_TYPE.INPUT_BOX:
                case app_server_interfaces_1.DISPLAY_TYPE.SELECTION_BOX:
                case app_server_interfaces_1.DISPLAY_TYPE.AUTOCOMPLETE_SELECT:
                case app_server_interfaces_1.DISPLAY_TYPE.TEXT_AREA:
                case app_server_interfaces_1.DISPLAY_TYPE.TOGGLE:
                case app_server_interfaces_1.DISPLAY_TYPE.BUTTON_TOGGLE:
                case app_server_interfaces_1.DISPLAY_TYPE.ROW_INPUT_BOX:
                    params = {
                        value: this.inputForm.get(inputParams.id).value,
                        displayType: inputParams.displayType
                    };
                    break;
                case app_server_interfaces_1.DISPLAY_TYPE.DATE_RANGE:
                    var dateFormGroup = this.inputForm.get(inputParams.id);
                    params = {
                        value: {
                            startDate: dateFormGroup.controls.startDate.value
                                ? dateFormGroup.controls.startDate.value.getTime()
                                : null,
                            endDate: dateFormGroup.controls.endDate.value
                                ? dateFormGroup.controls.endDate.value.getTime()
                                : null
                        },
                        displayType: inputParams.displayType
                    };
                    break;
                case app_server_interfaces_1.DISPLAY_TYPE.NUMBER_RANGE:
                    var numFormGroup = this.inputForm.get(inputParams.id);
                    params = {
                        value: {
                            minAmount: numFormGroup.controls.minAmount.value,
                            maxAmount: numFormGroup.controls.maxAmount.value
                        },
                        displayType: inputParams.displayType
                    };
                    break;
                case app_server_interfaces_1.DISPLAY_TYPE.IMAGE_UPLOAD:
                    params = {
                        value: this.fileUploadParams,
                        displayType: inputParams.displayType
                    };
                    break;
                case app_server_interfaces_1.DISPLAY_TYPE.RADIO:
                case app_server_interfaces_1.DISPLAY_TYPE.ROW_RADIO:
                    params = {
                        value: this.inputForm.get(inputParams.id).value || null,
                        displayType: inputParams.displayType
                    };
                    break;
                case app_server_interfaces_1.DISPLAY_TYPE.MULTI_CHECK_BOX:
                    params = {
                        value: this.inputForm.get(inputParams.id).value,
                        displayType: inputParams.displayType
                    };
                    break;
            }
            formOutputParams[inputParams.id] = params;
        }
        this.value.emit(formOutputParams);
    };
    MuFormContainerComponent.prototype.isCalanderOpen = function () {
        return this.picker.opened;
    };
    MuFormContainerComponent.prototype.closeCalander = function () {
        this.picker.close();
    };
    /*=====================================================================
                                HTML
    =====================================================================*/
    MuFormContainerComponent.prototype.selectedOption = function (event, i) {
        var inputParams = this.formParams.inputParams[i];
        this.inputForm.get(inputParams.id).setValue(event.value);
        if (this.eventPropagate)
            this.onSubmit();
    };
    MuFormContainerComponent.prototype.onToggleChane = function (event, i) {
        var inputParams = this.formParams.inputParams[i];
        this.inputForm.get(inputParams.id).setValue(event.checked);
        if (this.eventPropagate)
            this.onSubmit();
    };
    MuFormContainerComponent.prototype.onBtnToggleChange = function (event, i) {
        var inputParams = this.formParams.inputParams[i];
        this.inputForm.get(inputParams.id).setValue(event.value);
        if (this.eventPropagate)
            this.onSubmit();
    };
    MuFormContainerComponent.prototype.fileUploadValue = function (event) {
        this.fileUploadParams = event;
        if (this.eventPropagate)
            this.onSubmit();
    };
    MuFormContainerComponent.prototype.checkedOption = function (event, option, i) {
        var inputParams = this.formParams.inputParams[i], value = this.inputForm.get(inputParams.id).value;
        if (value) {
            var idIndex = value.findIndex(function (val) { return val.id === option.id; });
            if (idIndex !== -1) {
                value.splice(idIndex, 1);
                this.inputForm.get(inputParams.id).setValue(value);
            }
            else {
                value.push(option);
                this.inputForm.get(inputParams.id).setValue(value);
            }
        }
        else {
            this.inputForm.get(inputParams.id).setValue([option]);
        }
        if (this.eventPropagate)
            this.onSubmit();
    };
    MuFormContainerComponent.prototype.setChangedValues = function (event, i) {
        var inputParams = this.formParams.inputParams[i];
        this.inputForm.get(inputParams.id).setValue(event);
        if (this.eventPropagate)
            this.onSubmit();
    };
    MuFormContainerComponent.prototype.setDate = function (event, i) {
        var value = event.value, inputParams = this.formParams.inputParams[i];
        value && !this.isDateObj(value) ? this.inputForm.get(inputParams.id).setValue(value.toDate())
            : this.inputForm.get(inputParams.id).setValue(value);
        if (this.eventPropagate)
            this.onSubmit();
    };
    MuFormContainerComponent.prototype.setDateRange = function (event, i) {
        var formName = this.formParams.inputParams[i].id, dateGroup = this.inputForm.get(formName);
        var sDate = dateGroup.controls.startDate.value, eDate = dateGroup.controls.endDate.value;
        sDate && !this.isDateObj(sDate) ? dateGroup.controls.startDate.setValue(sDate.toDate())
            : dateGroup.controls.startDate.setValue(sDate);
        eDate && !this.isDateObj(eDate) ? dateGroup.controls.endDate.setValue(eDate.toDate())
            : dateGroup.controls.endDate.setValue(eDate);
        if (this.eventPropagate)
            this.onSubmit();
    };
    MuFormContainerComponent.prototype.setNumberRange = function (event, i) {
        var formName = this.formParams.inputParams[i].id, numGroup = this.inputForm.get(formName);
        numGroup.controls.minAmount.setValue(numGroup.controls.minAmount.value);
        numGroup.controls.maxAmount.setValue(numGroup.controls.maxAmount.value);
        if (this.eventPropagate)
            this.onSubmit();
    };
    MuFormContainerComponent.prototype.setAutocompleteValue = function (event, i) {
        var inputParams = this.formParams.inputParams[i];
        this.inputForm.get(inputParams.id).setValue(event.option.value);
        if (this.eventPropagate)
            this.onSubmit();
    };
    MuFormContainerComponent.prototype.displayFn = function (value) {
        return value && typeof value === 'object' ? value.value : value;
    };
    MuFormContainerComponent.prototype.hasError = function () {
        var hasError = false;
        for (var _i = 0, _a = this.formParams.inputParams; _i < _a.length; _i++) {
            var inputParams = _a[_i];
            switch (inputParams.displayType) {
                case app_server_interfaces_1.DISPLAY_TYPE.CALENDAR_BOX:
                case app_server_interfaces_1.DISPLAY_TYPE.INPUT_BOX:
                case app_server_interfaces_1.DISPLAY_TYPE.SELECTION_BOX:
                case app_server_interfaces_1.DISPLAY_TYPE.AUTOCOMPLETE_SELECT:
                case app_server_interfaces_1.DISPLAY_TYPE.TEXT_AREA:
                case app_server_interfaces_1.DISPLAY_TYPE.MULTI_CHECK_BOX:
                case app_server_interfaces_1.DISPLAY_TYPE.RADIO:
                case app_server_interfaces_1.DISPLAY_TYPE.ROW_RADIO:
                case app_server_interfaces_1.DISPLAY_TYPE.TOGGLE:
                case app_server_interfaces_1.DISPLAY_TYPE.BUTTON_TOGGLE:
                case app_server_interfaces_1.DISPLAY_TYPE.ROW_INPUT_BOX:
                    hasError = inputParams.isRequired
                        ? this.inputForm.invalid
                        : this.inputForm.get(inputParams.id).value && this.inputForm.invalid;
                    break;
                case app_server_interfaces_1.DISPLAY_TYPE.DATE_RANGE:
                    var dateFormGroup = this.inputForm.get(inputParams.id);
                    hasError = inputParams.isRequired
                        ? dateFormGroup.invalid
                        : ((dateFormGroup.controls.startDate.value && dateFormGroup.controls.startDate.invalid)
                            || (dateFormGroup.controls.startDate.value && !dateFormGroup.controls.endDate.value)
                            || (dateFormGroup.controls.endDate.value && dateFormGroup.controls.endDate.invalid));
                    break;
                case app_server_interfaces_1.DISPLAY_TYPE.NUMBER_RANGE:
                    var numFormGroup = this.inputForm.get(inputParams.id);
                    hasError = inputParams.isRequired
                        ? numFormGroup.invalid
                        : ((numFormGroup.controls.minAmount.value && numFormGroup.controls.minAmount.invalid)
                            || (numFormGroup.controls.minAmount.value && !numFormGroup.controls.maxAmount.value)
                            || (numFormGroup.controls.maxAmount.value && numFormGroup.controls.maxAmount.invalid));
                    break;
                case app_server_interfaces_1.DISPLAY_TYPE.IMAGE_UPLOAD:
                    this.fileUplInst.onSubmit();
                    hasError = inputParams.isRequired
                        ? (!this.fileUploadParams || Object.keys(this.fileUploadParams).length === 0)
                        : false;
            }
        }
        return hasError;
    };
    MuFormContainerComponent.prototype.dropDownToggle = function (event, index) {
        var inputParams = this.formParams.inputParams[index];
        if (!event && this.inputForm.get(inputParams.id).value) {
            if (this.formParams.inputParams[index + 1]) {
                this.inputContainers[index + 1].focus();
            }
            else {
                this.lastInpField.emit();
            }
        }
        this.dropdownOpen.emit(event);
    };
    MuFormContainerComponent.prototype.valueEntered = function (value, i) {
        var inputParams = this.formParams.inputParams[i];
        if (inputParams.displayType === app_server_interfaces_1.DISPLAY_TYPE.AUTOCOMPLETE_SELECT) {
            var option = inputParams.options.find(function (option) { return option.value === value; });
            option ? this.inputForm.get(inputParams.id).setValue(option)
                : this.inputForm.get(inputParams.id).setValue({ id: value, value: value });
            if (this.eventPropagate)
                this.onSubmit();
        }
    };
    MuFormContainerComponent.prototype.enterOnLastInput = function (event) {
        this.lastInpField.emit(event);
    };
    /*=====================================================================
                                PRIVATE
    =====================================================================*/
    MuFormContainerComponent.prototype.initialize = function () {
        var _this = this;
        var _loop_1 = function (params) {
            var formValidations = [];
            if (params.isRequired)
                formValidations.push(forms_1.Validators.required);
            if (params.validators)
                formValidations.push(forms_1.Validators.pattern(params.validators.validation));
            switch (params.displayType) {
                case app_server_interfaces_1.DISPLAY_TYPE.INPUT_BOX:
                case app_server_interfaces_1.DISPLAY_TYPE.TEXT_AREA:
                case app_server_interfaces_1.DISPLAY_TYPE.RADIO:
                case app_server_interfaces_1.DISPLAY_TYPE.ROW_RADIO:
                case app_server_interfaces_1.DISPLAY_TYPE.SELECTION_BOX:
                case app_server_interfaces_1.DISPLAY_TYPE.TOGGLE:
                case app_server_interfaces_1.DISPLAY_TYPE.MULTI_CHECK_BOX:
                case app_server_interfaces_1.DISPLAY_TYPE.BUTTON_TOGGLE:
                case app_server_interfaces_1.DISPLAY_TYPE.ROW_INPUT_BOX:
                    this_1.inputForm.addControl(params.id, new forms_1.FormControl(params.value || null, formValidations));
                    if (params.options && params.options.length) {
                        var selectedValues_1 = [];
                        params.options.forEach(function (opt) {
                            if (opt.selected)
                                selectedValues_1.push(opt);
                        });
                        if (selectedValues_1.length)
                            this_1.inputForm.setValue(selectedValues_1);
                    }
                    this_1.setDisabled(params.isDisabled);
                    break;
                case app_server_interfaces_1.DISPLAY_TYPE.AUTOCOMPLETE_SELECT:
                    this_1.inputForm.addControl(params.id, new forms_1.FormControl(params.value || null, formValidations));
                    this_1.filteredOptions = this_1.inputForm.valueChanges.pipe(operators_1.startWith(''), operators_1.map(function (value) { return typeof value === 'string' ? value : value.value; }), operators_1.map(function (value) { return value ? _this.filterOptions(value, params)
                        : params.options.slice(); }));
                    this_1.setDisabled(params.isDisabled);
                    break;
                case app_server_interfaces_1.DISPLAY_TYPE.CALENDAR_BOX:
                    if (params.value)
                        params.value = new Date(params.value);
                    formValidations.push(input_validator_1.InputValidator.futureDateValidator);
                    this_1.inputForm.addControl(params.id, new forms_1.FormControl(params.value || null, formValidations));
                    this_1.setDisabled(params.isDisabled);
                    break;
                case app_server_interfaces_1.DISPLAY_TYPE.DATE_RANGE:
                    if (!params.value)
                        params.value = {};
                    var valiArr = [input_validator_1.InputValidator.dateValidator];
                    if (!params.validators || !params.validators.allowFutureDate)
                        valiArr.push(input_validator_1.InputValidator.futureDateValidatorIfAllowed);
                    this_1.inputForm.addControl(params.id, new forms_1.FormGroup({
                        startDate: new forms_1.FormControl(params.value['startDate'] ? new Date(params.value.startDate)
                            : null, formValidations),
                        endDate: new forms_1.FormControl(params.value['endDate'] ? new Date(params.value.endDate)
                            : null, formValidations),
                    }, {
                        validators: valiArr
                    }));
                    this_1.setDisabled(params.isDisabled);
                    break;
                case app_server_interfaces_1.DISPLAY_TYPE.NUMBER_RANGE:
                    if (!params.value)
                        params.value = {};
                    this_1.inputForm.addControl(params.id, new forms_1.FormGroup({
                        minAmount: new forms_1.FormControl(params.value['minAmount'] || null, formValidations),
                        maxAmount: new forms_1.FormControl(params.value['maxAmount'] || null, formValidations),
                    }, {
                        validators: [input_validator_1.InputValidator.amountValidator]
                    }));
                    this_1.setDisabled(params.isDisabled);
                    break;
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.formParams.inputParams; _i < _a.length; _i++) {
            var params = _a[_i];
            _loop_1(params);
        }
        if (this.formParams.formValidators)
            this.inputForm.setValidators(this.formParams.formValidators.validation);
    };
    MuFormContainerComponent.prototype.filterOptions = function (inputText, params) {
        var filterValue = inputText.toLowerCase();
        return params.options.filter(function (option) {
            return option.value.toLowerCase().includes(filterValue);
        });
    };
    MuFormContainerComponent.prototype.setDisabled = function (value) {
        value ? this.inputForm.disable() : this.inputForm.enable();
    };
    MuFormContainerComponent.prototype.isDateObj = function (value) {
        var isDate;
        switch (typeof value) {
            case "string":
                isDate = !isNaN(Date.parse(value));
                break;
            case "object":
                isDate = value instanceof Date
                    ? !isNaN(value.getTime())
                    : false;
                break;
            default: isDate = false;
        }
        return isDate;
    };
    /*=====================================================================
                                UTILS
    =====================================================================*/
    MuFormContainerComponent.prototype.focusElement = function (index) {
        this.inputContainers[index].focus();
    };
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    __decorate([
        core_1.ViewChild(material_1.MatDatepicker, { static: false }),
        __metadata("design:type", typeof (_a = typeof material_1.MatDatepicker !== "undefined" && material_1.MatDatepicker) === "function" ? _a : Object)
    ], MuFormContainerComponent.prototype, "picker", void 0);
    __decorate([
        core_1.ViewChild(file_upload_component_1.FileUploadComponent, { static: false }),
        __metadata("design:type", file_upload_component_1.FileUploadComponent)
    ], MuFormContainerComponent.prototype, "fileUplInst", void 0);
    __decorate([
        core_1.ViewChildren('inputCont'),
        __metadata("design:type", typeof (_b = typeof core_1.QueryList !== "undefined" && core_1.QueryList) === "function" ? _b : Object)
    ], MuFormContainerComponent.prototype, "inputCont", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", typeof (_c = typeof app_server_interfaces_1.MuFormParams !== "undefined" && app_server_interfaces_1.MuFormParams) === "function" ? _c : Object)
    ], MuFormContainerComponent.prototype, "formParams", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", trackable_screen_1.TrackableScreen)
    ], MuFormContainerComponent.prototype, "screen", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MuFormContainerComponent.prototype, "webMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", typeof (_d = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _d : Object)
    ], MuFormContainerComponent.prototype, "parentCont", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MuFormContainerComponent.prototype, "eventPropagate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", typeof (_e = typeof app_server_interfaces_1.DISPLAY_MODE !== "undefined" && app_server_interfaces_1.DISPLAY_MODE) === "function" ? _e : Object)
    ], MuFormContainerComponent.prototype, "displayMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MuFormContainerComponent.prototype, "displayLabel", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_f = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _f : Object)
    ], MuFormContainerComponent.prototype, "value", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_g = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _g : Object)
    ], MuFormContainerComponent.prototype, "dropdownOpen", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_h = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _h : Object)
    ], MuFormContainerComponent.prototype, "lastInpField", void 0);
    MuFormContainerComponent = __decorate([
        core_1.Component({
            selector: 'mu-form-container',
            templateUrl: './mu-form-container.component.html',
            styleUrls: ['./mu-form-container.component.scss']
        }),
        __param(0, core_1.Inject('RunContext')),
        __metadata("design:paramtypes", [rc_browser_1.RunContextBrowser, typeof (_j = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" ? _j : Object, typeof (_k = typeof core_1.ChangeDetectorRef !== "undefined" && core_1.ChangeDetectorRef) === "function" ? _k : Object])
    ], MuFormContainerComponent);
    return MuFormContainerComponent;
}());
exports.MuFormContainerComponent = MuFormContainerComponent;
//# sourceMappingURL=mu-form-container.component.js.map