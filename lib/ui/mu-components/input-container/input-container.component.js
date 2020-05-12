"use strict";
/*------------------------------------------------------------------------------
   About          : Child component which has individual control for each input
                    type
   
   Created on     : Fri May 24 2019
   Author         : Pulkit Chaturvedi
   Last edited by : Divya Sinha
   
   Copyright (c) 2019 Obopay. All rights reserved.
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
var trackable_screen_1 = require("../../../ui/router/trackable-screen");
var rc_browser_1 = require("../../../rc-browser");
var material_1 = require("@angular/material");
var input_validator_1 = require("./input-validator");
var operators_1 = require("rxjs/operators");
var file_upload_component_1 = require("../file-upload/file-upload.component");
var core_2 = require("@mubble/core");
var InputContainerComponent = /** @class */ (function () {
    function InputContainerComponent(rc, formBuilder) {
        this.rc = rc;
        this.formBuilder = formBuilder;
        this.eventPropagate = false;
        this.displayLabel = true;
        this.value = new core_1.EventEmitter();
        this.dropdownOpen = new core_1.EventEmitter();
        this.DISPLAY_TYPE = core_2.DISPLAY_TYPE;
        this.DISPLAY_MODE = core_2.DISPLAY_MODE;
    }
    InputContainerComponent.prototype.ngOnChanges = function () {
        this.initialize();
    };
    InputContainerComponent.prototype.ngOnInit = function () {
        this.initialize();
    };
    /*=====================================================================
                                UTILS
    =====================================================================*/
    InputContainerComponent.prototype.onSubmit = function () {
        if (this.inputForm && (this.inputParams.validators || this.inputParams.isRequired))
            this.inputForm.markAsTouched();
        if (this.dateRange && this.inputParams.validators) {
            this.dateRange.controls.startDate.markAsTouched();
            this.dateRange.controls.endDate.markAsTouched();
        }
        if (this.numberRange && this.inputParams.validators) {
            this.numberRange.controls.minAmount.markAsTouched();
            this.numberRange.controls.maxAmount.markAsTouched();
        }
        if (this.hasError())
            return;
        var params, emitValue = true;
        switch (this.inputParams.displayType) {
            case core_2.DISPLAY_TYPE.CALENDAR_BOX:
                params = {
                    id: this.inputParams.id,
                    value: this.inputForm.value.getTime(),
                    displayType: this.inputParams.displayType
                };
                break;
            case core_2.DISPLAY_TYPE.INPUT_BOX:
            case core_2.DISPLAY_TYPE.SELECTION_BOX:
            case core_2.DISPLAY_TYPE.AUTOCOMPLETE_SELECT:
            case core_2.DISPLAY_TYPE.TEXT_AREA:
            case core_2.DISPLAY_TYPE.TOGGLE:
            case core_2.DISPLAY_TYPE.BUTTON_TOGGLE:
            case core_2.DISPLAY_TYPE.ROW_INPUT_BOX:
                params = {
                    id: this.inputParams.id,
                    value: this.inputForm.value,
                    displayType: this.inputParams.displayType
                };
                break;
            case core_2.DISPLAY_TYPE.DATE_RANGE:
                params = {
                    id: this.inputParams.id,
                    value: {
                        startDate: this.dateRange.controls.startDate.value
                            ? this.dateRange.controls.startDate.value.getTime()
                            : null,
                        endDate: this.dateRange.controls.endDate.value
                            ? this.dateRange.controls.endDate.value.getTime()
                            : null
                    },
                    displayType: this.inputParams.displayType
                };
                break;
            case core_2.DISPLAY_TYPE.NUMBER_RANGE:
                params = {
                    id: this.inputParams.id,
                    value: {
                        minAmount: this.numberRange.controls.minAmount.value,
                        maxAmount: this.numberRange.controls.maxAmount.value
                    },
                    displayType: this.inputParams.displayType
                };
                break;
            case core_2.DISPLAY_TYPE.IMAGE_UPLOAD:
                params = {
                    id: this.inputParams.id,
                    value: this.fileUploadParams,
                    displayType: this.inputParams.displayType
                };
                break;
            case core_2.DISPLAY_TYPE.RADIO:
            case core_2.DISPLAY_TYPE.ROW_RADIO:
                params = {
                    id: this.inputParams.id,
                    value: this.inputForm.value ? this.inputForm.value : null,
                    displayType: this.inputParams.displayType
                };
                break;
            case core_2.DISPLAY_TYPE.MULTI_CHECK_BOX:
                params = {
                    id: this.inputParams.id,
                    value: this.inputForm.value,
                    displayType: this.inputParams.displayType
                };
                break;
        }
        if (emitValue)
            this.value.emit(params);
    };
    InputContainerComponent.prototype.isCalanderOpen = function () {
        return this.picker.opened;
    };
    InputContainerComponent.prototype.closeCalander = function () {
        this.picker.close();
    };
    /*=====================================================================
                                HTML
    =====================================================================*/
    InputContainerComponent.prototype.selectedOption = function (event) {
        this.inputForm.setValue(event.value);
        if (this.eventPropagate)
            this.onSubmit();
    };
    InputContainerComponent.prototype.onToggleChane = function (event) {
        this.inputForm.setValue(event.checked);
        if (this.eventPropagate)
            this.onSubmit();
    };
    InputContainerComponent.prototype.onBtnToggleChange = function (event, index) {
        this.inputForm.setValue(event.value);
        if (this.eventPropagate)
            this.onSubmit();
    };
    InputContainerComponent.prototype.fileUploadValue = function (event) {
        this.fileUploadParams = event;
        if (this.eventPropagate)
            this.onSubmit();
    };
    InputContainerComponent.prototype.checkedOption = function (event, option) {
        var value = this.inputForm.value;
        if (value) {
            var idIndex = value.findIndex(function (val) { return val.id === option.id; });
            if (idIndex !== -1) {
                value.splice(idIndex, 1);
                this.inputForm.setValue(value);
            }
            else {
                value.push(option);
                this.inputForm.setValue(value);
            }
        }
        else {
            this.inputForm.setValue([option]);
        }
        if (this.eventPropagate)
            this.onSubmit();
    };
    InputContainerComponent.prototype.setChangedValues = function (event) {
        this.inputForm.setValue(event);
        if (this.eventPropagate)
            this.onSubmit();
    };
    InputContainerComponent.prototype.setDate = function (event) {
        var value = event.value;
        value && !this.isDateObj(value) ? this.inputForm.setValue(value.toDate())
            : this.inputForm.setValue(value);
        if (this.eventPropagate)
            this.onSubmit();
    };
    InputContainerComponent.prototype.setDateRange = function (event) {
        var sDate = this.dateRange.controls.startDate.value, eDate = this.dateRange.controls.endDate.value;
        sDate && !this.isDateObj(sDate) ? this.dateRange.controls.startDate.setValue(sDate.toDate())
            : this.dateRange.controls.startDate.setValue(sDate);
        eDate && !this.isDateObj(eDate) ? this.dateRange.controls.endDate.setValue(eDate.toDate())
            : this.dateRange.controls.endDate.setValue(eDate);
        if (this.eventPropagate)
            this.onSubmit();
    };
    InputContainerComponent.prototype.setNumberRange = function (event) {
        this.numberRange.controls.minAmount.setValue(this.numberRange.controls.minAmount.value);
        this.numberRange.controls.maxAmount.setValue(this.numberRange.controls.maxAmount.value);
        if (this.eventPropagate)
            this.onSubmit();
    };
    InputContainerComponent.prototype.setAutocompleteValue = function (event) {
        this.inputForm.setValue(event.option.value);
        if (this.eventPropagate)
            this.onSubmit();
    };
    InputContainerComponent.prototype.displayFn = function (value) {
        return value && typeof value === 'object' ? value.value : value;
    };
    InputContainerComponent.prototype.hasError = function () {
        var hasError = false;
        switch (this.inputParams.displayType) {
            case core_2.DISPLAY_TYPE.CALENDAR_BOX:
            case core_2.DISPLAY_TYPE.INPUT_BOX:
            case core_2.DISPLAY_TYPE.SELECTION_BOX:
            case core_2.DISPLAY_TYPE.AUTOCOMPLETE_SELECT:
            case core_2.DISPLAY_TYPE.TEXT_AREA:
            case core_2.DISPLAY_TYPE.MULTI_CHECK_BOX:
            case core_2.DISPLAY_TYPE.RADIO:
            case core_2.DISPLAY_TYPE.ROW_RADIO:
            case core_2.DISPLAY_TYPE.TOGGLE:
            case core_2.DISPLAY_TYPE.BUTTON_TOGGLE:
            case core_2.DISPLAY_TYPE.ROW_INPUT_BOX:
                hasError = this.inputParams.isRequired
                    ? this.inputForm.invalid
                    : this.inputForm.value && this.inputForm.invalid;
                break;
            case core_2.DISPLAY_TYPE.DATE_RANGE:
                hasError = this.inputParams.isRequired
                    ? this.dateRange.invalid
                    : ((this.dateRange.controls.startDate.value && this.dateRange.controls.startDate.invalid)
                        || (this.dateRange.controls.startDate.value && !this.dateRange.controls.endDate.value)
                        || (this.dateRange.controls.endDate.value && this.dateRange.controls.endDate.invalid));
                break;
            case core_2.DISPLAY_TYPE.NUMBER_RANGE:
                hasError = this.inputParams.isRequired
                    ? this.numberRange.invalid
                    : ((this.numberRange.controls.minAmount.value && this.numberRange.controls.minAmount.invalid)
                        || (this.numberRange.controls.minAmount.value && !this.numberRange.controls.maxAmount.value)
                        || (this.numberRange.controls.maxAmount.value && this.numberRange.controls.maxAmount.invalid));
                break;
            case core_2.DISPLAY_TYPE.IMAGE_UPLOAD:
                this.fileUplInst.onSubmit();
                hasError = this.inputParams.isRequired
                    ? (!this.fileUploadParams || Object.keys(this.fileUploadParams).length === 0)
                    : false;
        }
        return hasError;
    };
    InputContainerComponent.prototype.dropDownToggle = function (event) {
        this.dropdownOpen.emit(event);
    };
    InputContainerComponent.prototype.valueEntered = function (value) {
        if (this.inputParams.displayType === core_2.DISPLAY_TYPE.AUTOCOMPLETE_SELECT) {
            var option = this.inputParams.options.find(function (option) { return option.value === value; });
            option ? this.inputForm.setValue(option)
                : this.inputForm.setValue({ id: value, value: value });
            if (this.eventPropagate)
                this.onSubmit();
        }
    };
    /*=====================================================================
                                PRIVATE
    =====================================================================*/
    InputContainerComponent.prototype.initialize = function () {
        var _this = this;
        var params = this.inputParams, formValidations = [];
        if (params.isRequired)
            formValidations.push(forms_1.Validators.required);
        if (params.validators)
            formValidations.push(forms_1.Validators.pattern(params.validators.validation));
        switch (params.displayType) {
            case core_2.DISPLAY_TYPE.INPUT_BOX:
            case core_2.DISPLAY_TYPE.TEXT_AREA:
            case core_2.DISPLAY_TYPE.RADIO:
            case core_2.DISPLAY_TYPE.ROW_RADIO:
            case core_2.DISPLAY_TYPE.SELECTION_BOX:
            case core_2.DISPLAY_TYPE.TOGGLE:
            case core_2.DISPLAY_TYPE.MULTI_CHECK_BOX:
            case core_2.DISPLAY_TYPE.BUTTON_TOGGLE:
            case core_2.DISPLAY_TYPE.ROW_INPUT_BOX:
                this.inputForm = new forms_1.FormControl(params.value || null, formValidations);
                if (params.options && params.options.length) {
                    var selectedValues_1 = [];
                    params.options.forEach(function (opt) {
                        if (opt.selected)
                            selectedValues_1.push(opt);
                    });
                    if (selectedValues_1.length)
                        this.inputForm.setValue(selectedValues_1);
                }
                this.setDisabled(params.isDisabled);
                break;
                break;
            case core_2.DISPLAY_TYPE.AUTOCOMPLETE_SELECT:
                this.inputForm = new forms_1.FormControl(params.value || null, formValidations);
                this.filteredOptions = this.inputForm.valueChanges.pipe(operators_1.startWith(''), operators_1.map(function (value) { return typeof value === 'string' ? value : value.value; }), operators_1.map(function (value) { return value ? _this.filterOptions(value)
                    : _this.inputParams.options.slice(); }));
                this.setDisabled(params.isDisabled);
                break;
            case core_2.DISPLAY_TYPE.CALENDAR_BOX:
                if (params.value)
                    params.value = new Date(params.value);
                formValidations.push(input_validator_1.InputValidator.futureDateValidator);
                this.inputForm = new forms_1.FormControl(params.value || null, formValidations);
                this.setDisabled(params.isDisabled);
                break;
            case core_2.DISPLAY_TYPE.DATE_RANGE:
                if (params.value) {
                    if (params.value.startDate)
                        params.value.startDate = new Date(params.value.startDate);
                    if (params.value.endDate)
                        params.value.endDate = new Date(params.value.endDate);
                }
                else {
                    params.value = {};
                }
                this.dateRange = this.formBuilder.group({
                    startDate: [params.value['startDate'] || null, formValidations],
                    endDate: [params.value['endDate'] || null, formValidations]
                });
                var valiArr = [input_validator_1.InputValidator.dateValidator];
                if (!params.validators || !params.validators.allowFutureDate)
                    valiArr.push(input_validator_1.InputValidator.futureDateValidatorIfAllowed);
                this.dateRange.setValidators(valiArr);
                if (params.isDisabled)
                    this.dateRange.disable();
                break;
            case core_2.DISPLAY_TYPE.NUMBER_RANGE:
                this.numberRange = this.formBuilder.group({
                    minAmount: [params.value['minAmount'] || null, formValidations],
                    maxAmount: [params.value['maxAmount'] || null, formValidations]
                }, {
                    validator: [input_validator_1.InputValidator.amountValidator]
                });
                if (params.isDisabled)
                    this.numberRange.disable();
                break;
        }
    };
    InputContainerComponent.prototype.filterOptions = function (inputText) {
        var filterValue = inputText.toLowerCase();
        return this.inputParams.options.filter(function (option) {
            return option.value.toLowerCase().includes(filterValue);
        });
    };
    InputContainerComponent.prototype.setDisabled = function (value) {
        value ? this.inputForm.disable() : this.inputForm.enable();
    };
    InputContainerComponent.prototype.isDateObj = function (value) {
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
    var _a, _b, _c, _d, _e;
    __decorate([
        core_1.ViewChild(material_1.MatDatepicker, { static: false }),
        __metadata("design:type", typeof (_a = typeof material_1.MatDatepicker !== "undefined" && material_1.MatDatepicker) === "function" ? _a : Object)
    ], InputContainerComponent.prototype, "picker", void 0);
    __decorate([
        core_1.ViewChild(file_upload_component_1.FileUploadComponent, { static: false }),
        __metadata("design:type", file_upload_component_1.FileUploadComponent)
    ], InputContainerComponent.prototype, "fileUplInst", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], InputContainerComponent.prototype, "inputParams", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", trackable_screen_1.TrackableScreen)
    ], InputContainerComponent.prototype, "screen", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], InputContainerComponent.prototype, "webMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", typeof (_b = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" ? _b : Object)
    ], InputContainerComponent.prototype, "parentCont", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], InputContainerComponent.prototype, "eventPropagate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], InputContainerComponent.prototype, "displayMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], InputContainerComponent.prototype, "displayLabel", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_c = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _c : Object)
    ], InputContainerComponent.prototype, "value", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_d = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" ? _d : Object)
    ], InputContainerComponent.prototype, "dropdownOpen", void 0);
    InputContainerComponent = __decorate([
        core_1.Component({
            selector: 'input-container',
            templateUrl: './input-container.component.html',
            styleUrls: ['./input-container.component.scss']
        }),
        __param(0, core_1.Inject('RunContext')),
        __metadata("design:paramtypes", [rc_browser_1.RunContextBrowser, typeof (_e = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" ? _e : Object])
    ], InputContainerComponent);
    return InputContainerComponent;
}());
exports.InputContainerComponent = InputContainerComponent;
//# sourceMappingURL=input-container.component.js.map