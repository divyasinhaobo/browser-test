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
var FormContainerComponent = /** @class */ (function () {
    function FormContainerComponent(rc, formBuilder, changeRef) {
        this.rc = rc;
        this.formBuilder = formBuilder;
        this.changeRef = changeRef;
        this.eventPropagate = false;
        this.displayLabel = true;
        this.value = new core_1.EventEmitter();
        this.dropdownOpen = new core_1.EventEmitter();
        this.inputForm = {};
        this.DISPLAY_TYPE = app_server_interfaces_1.DISPLAY_TYPE;
        this.DISPLAY_MODE = app_server_interfaces_1.DISPLAY_MODE;
        this.inputForm = this.formBuilder.group({});
    }
    FormContainerComponent.prototype.ngOnChanges = function () {
        this.initialize();
    };
    FormContainerComponent.prototype.ngOnInit = function () {
        this.initialize();
    };
    FormContainerComponent.prototype.ngAfterViewInit = function () {
        this.inputContainers = this.inputCont.toArray().map(function (val) { return val.nativeElement; });
        this.changeRef.detectChanges();
    };
    /*=====================================================================
                                UTILS
    =====================================================================*/
    FormContainerComponent.prototype.onSubmit = function () {
        for (var _i = 0, _a = this.formParams.inputParams; _i < _a.length; _i++) {
            var inputParams = _a[_i];
            if (this.inputForm && (inputParams.validators || inputParams.isRequired))
                this.inputForm.get(inputParams.id).markAsTouched();
            if (this.dateRange && inputParams.validators) {
                this.dateRange.controls.startDate.markAsTouched();
                this.dateRange.controls.endDate.markAsTouched();
            }
            if (this.numberRange && inputParams.validators) {
                this.numberRange.controls.minAmount.markAsTouched();
                this.numberRange.controls.maxAmount.markAsTouched();
            }
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
                    params = {
                        value: {
                            startDate: this.dateRange.controls.startDate.value
                                ? this.dateRange.controls.startDate.value.getTime()
                                : null,
                            endDate: this.dateRange.controls.endDate.value
                                ? this.dateRange.controls.endDate.value.getTime()
                                : null
                        },
                        displayType: inputParams.displayType
                    };
                    break;
                case app_server_interfaces_1.DISPLAY_TYPE.NUMBER_RANGE:
                    params = {
                        value: {
                            minAmount: this.numberRange.controls.minAmount.value,
                            maxAmount: this.numberRange.controls.maxAmount.value
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
    FormContainerComponent.prototype.isCalanderOpen = function () {
        return this.picker.opened;
    };
    FormContainerComponent.prototype.closeCalander = function () {
        this.picker.close();
    };
    /*=====================================================================
                                HTML
    =====================================================================*/
    FormContainerComponent.prototype.selectedOption = function (event, i) {
        var inputParams = this.formParams.inputParams[i];
        this.inputForm.get(inputParams.id).setValue(event.value);
        if (this.eventPropagate)
            this.onSubmit();
    };
    FormContainerComponent.prototype.onToggleChane = function (event, i) {
        var inputParams = this.formParams.inputParams[i];
        this.inputForm.get(inputParams.id).setValue(event.checked);
        if (this.eventPropagate)
            this.onSubmit();
    };
    FormContainerComponent.prototype.onBtnToggleChange = function (event, i) {
        var inputParams = this.formParams.inputParams[i];
        this.inputForm.get(inputParams.id).setValue(event.value);
        if (this.eventPropagate)
            this.onSubmit();
    };
    FormContainerComponent.prototype.fileUploadValue = function (event) {
        this.fileUploadParams = event;
        if (this.eventPropagate)
            this.onSubmit();
    };
    FormContainerComponent.prototype.checkedOption = function (event, option, i) {
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
    FormContainerComponent.prototype.setChangedValues = function (event, i) {
        var inputParams = this.formParams.inputParams[i];
        this.inputForm.get(inputParams.id).setValue(event);
        if (this.eventPropagate)
            this.onSubmit();
    };
    FormContainerComponent.prototype.setDate = function (event, i) {
        var value = event.value, inputParams = this.formParams.inputParams[i];
        value && !this.isDateObj(value) ? this.inputForm.get(inputParams.id).setValue(value.toDate())
            : this.inputForm.get(inputParams.id).setValue(value);
        if (this.eventPropagate)
            this.onSubmit();
    };
    FormContainerComponent.prototype.setDateRange = function (event, i) {
        var sDate = this.dateRange.controls.startDate.value, eDate = this.dateRange.controls.endDate.value;
        sDate && !this.isDateObj(sDate) ? this.dateRange.controls.startDate.setValue(sDate.toDate())
            : this.dateRange.controls.startDate.setValue(sDate);
        eDate && !this.isDateObj(eDate) ? this.dateRange.controls.endDate.setValue(eDate.toDate())
            : this.dateRange.controls.endDate.setValue(eDate);
        if (this.eventPropagate)
            this.onSubmit();
    };
    FormContainerComponent.prototype.setNumberRange = function (event, i) {
        this.numberRange.controls.minAmount.setValue(this.numberRange.controls.minAmount.value);
        this.numberRange.controls.maxAmount.setValue(this.numberRange.controls.maxAmount.value);
        if (this.eventPropagate)
            this.onSubmit();
    };
    FormContainerComponent.prototype.setAutocompleteValue = function (event, i) {
        var inputParams = this.formParams.inputParams[i];
        this.inputForm.get(inputParams.id).setValue(event.option.value);
        if (this.eventPropagate)
            this.onSubmit();
    };
    FormContainerComponent.prototype.displayFn = function (value) {
        return value && typeof value === 'object' ? value.value : value;
    };
    FormContainerComponent.prototype.hasError = function () {
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
                    hasError = inputParams.isRequired
                        ? this.dateRange.invalid
                        : ((this.dateRange.controls.startDate.value && this.dateRange.controls.startDate.invalid)
                            || (this.dateRange.controls.startDate.value && !this.dateRange.controls.endDate.value)
                            || (this.dateRange.controls.endDate.value && this.dateRange.controls.endDate.invalid));
                    break;
                case app_server_interfaces_1.DISPLAY_TYPE.NUMBER_RANGE:
                    hasError = inputParams.isRequired
                        ? this.numberRange.invalid
                        : ((this.numberRange.controls.minAmount.value && this.numberRange.controls.minAmount.invalid)
                            || (this.numberRange.controls.minAmount.value && !this.numberRange.controls.maxAmount.value)
                            || (this.numberRange.controls.maxAmount.value && this.numberRange.controls.maxAmount.invalid));
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
    FormContainerComponent.prototype.dropDownToggle = function (event) {
        this.dropdownOpen.emit(event);
    };
    FormContainerComponent.prototype.valueEntered = function (value, i) {
        var inputParams = this.formParams.inputParams[i];
        if (inputParams.displayType === app_server_interfaces_1.DISPLAY_TYPE.AUTOCOMPLETE_SELECT) {
            var option = inputParams.options.find(function (option) { return option.value === value; });
            option ? this.inputForm.get(inputParams.id).setValue(option)
                : this.inputForm.get(inputParams.id).setValue({ id: value, value: value });
            if (this.eventPropagate)
                this.onSubmit();
        }
    };
    /*=====================================================================
                                PRIVATE
    =====================================================================*/
    FormContainerComponent.prototype.initialize = function () {
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
                    if (params.value) {
                        if (params.value.startDate)
                            params.value.startDate = new Date(params.value.startDate);
                        if (params.value.endDate)
                            params.value.endDate = new Date(params.value.endDate);
                    }
                    else {
                        params.value = {};
                    }
                    this_1.dateRange = this_1.formBuilder.group({
                        startDate: [params.value['startDate'] || null, formValidations],
                        endDate: [params.value['endDate'] || null, formValidations]
                    });
                    var valiArr = [input_validator_1.InputValidator.dateValidator];
                    if (!params.validators || !params.validators.allowFutureDate)
                        valiArr.push(input_validator_1.InputValidator.futureDateValidatorIfAllowed);
                    this_1.dateRange.setValidators(valiArr);
                    if (params.isDisabled)
                        this_1.dateRange.disable();
                    break;
                case app_server_interfaces_1.DISPLAY_TYPE.NUMBER_RANGE:
                    this_1.numberRange = this_1.formBuilder.group({
                        minAmount: [params.value['minAmount'] || null, formValidations],
                        maxAmount: [params.value['maxAmount'] || null, formValidations]
                    }, {
                        validator: [input_validator_1.InputValidator.amountValidator]
                    });
                    if (params.isDisabled)
                        this_1.numberRange.disable();
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
    FormContainerComponent.prototype.filterOptions = function (inputText, params) {
        var filterValue = inputText.toLowerCase();
        return params.options.filter(function (option) {
            return option.value.toLowerCase().includes(filterValue);
        });
    };
    FormContainerComponent.prototype.setDisabled = function (value) {
        value ? this.inputForm.disable() : this.inputForm.enable();
    };
    FormContainerComponent.prototype.isDateObj = function (value) {
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    __decorate([
        core_1.ViewChild(material_1.MatDatepicker, { static: false }),
        __metadata("design:type", typeof (_a = typeof material_1.MatDatepicker !== "undefined" && material_1.MatDatepicker) === "function" ? _a : Object)
    ], FormContainerComponent.prototype, "picker", void 0);
    __decorate([
        core_1.ViewChild(file_upload_component_1.FileUploadComponent, { static: false }),
        __metadata("design:type", file_upload_component_1.FileUploadComponent)
    ], FormContainerComponent.prototype, "fileUplInst", void 0);
    __decorate([
        core_1.ViewChildren('inputCont'),
        __metadata("design:type", typeof (_b = typeof core_1.QueryList !== "undefined" && core_1.QueryList) === "function" ? _b : Object)
    ], FormContainerComponent.prototype, "inputCont", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", typeof (_c = typeof app_server_interfaces_1.FormParams !== "undefined" && app_server_interfaces_1.FormParams) === "function" ? _c : Object)
    ], FormContainerComponent.prototype, "formParams", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", trackable_screen_1.TrackableScreen)
    ], FormContainerComponent.prototype, "screen", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FormContainerComponent.prototype, "webMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", typeof (_d = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _d : Object)
    ], FormContainerComponent.prototype, "parentCont", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FormContainerComponent.prototype, "eventPropagate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", typeof (_e = typeof app_server_interfaces_1.DISPLAY_MODE !== "undefined" && app_server_interfaces_1.DISPLAY_MODE) === "function" ? _e : Object)
    ], FormContainerComponent.prototype, "displayMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FormContainerComponent.prototype, "displayLabel", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_f = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _f : Object)
    ], FormContainerComponent.prototype, "value", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_g = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _g : Object)
    ], FormContainerComponent.prototype, "dropdownOpen", void 0);
    FormContainerComponent = __decorate([
        core_1.Component({
            selector: 'form-container',
            templateUrl: './form-container.component.html',
            styleUrls: ['./form-container.component.scss']
        }),
        __param(0, core_1.Inject('RunContext')),
        __metadata("design:paramtypes", [rc_browser_1.RunContextBrowser, typeof (_h = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" ? _h : Object, typeof (_j = typeof core_1.ChangeDetectorRef !== "undefined" && core_1.ChangeDetectorRef) === "function" ? _j : Object])
    ], FormContainerComponent);
    return FormContainerComponent;
}());
exports.FormContainerComponent = FormContainerComponent;
//# sourceMappingURL=form-container.component.js.map