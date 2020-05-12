"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var flex_layout_1 = require("@angular/flex-layout");
var material_1 = require("@angular/material");
var checkbox_1 = require("@angular/material/checkbox");
var datepicker_1 = require("@angular/material/datepicker");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var select_1 = require("@angular/material/select");
var autocomplete_1 = require("@angular/material/autocomplete");
var radio_1 = require("@angular/material/radio");
var progress_bar_1 = require("@angular/material/progress-bar");
var slider_1 = require("@angular/material/slider");
var slide_toggle_1 = require("@angular/material/slide-toggle");
var button_toggle_1 = require("@angular/material/button-toggle");
var menu_1 = require("@angular/material/menu");
var mu_components_routing_module_1 = require("./mu-components-routing.module");
var translate_1 = require("./translate");
var custom_breakpoints_1 = require("./custom-breakpoints");
var directives_1 = require("./directives");
var pipes_1 = require("./pipes");
var bottom_in_component_1 = require("./bottom-in/bottom-in.component");
var modal_popup_component_1 = require("./modal-popup/modal-popup.component");
var loading_component_1 = require("./loading/loading.component");
var loading_error_component_1 = require("./loading/loading-error/loading-error.component");
var loading_overlay_component_1 = require("./loading/loading-overlay/loading-overlay.component");
var toast_component_1 = require("./toast/toast.component");
var infinite_scroll_component_1 = require("./infinite-scroll/infinite-scroll.component");
var filter_component_1 = require("./filter/filter.component");
var input_container_component_1 = require("./input-container/input-container.component");
var dialer_component_1 = require("./dialer/dialer.component");
var mu_form_container_component_1 = require("./mu-form-container/mu-form-container.component");
var alert_dialog_component_1 = require("./alert-dialog/alert-dialog.component");
var mu_data_table_component_1 = require("./mu-data-table/mu-data-table.component");
var file_upload_component_1 = require("./file-upload/file-upload.component");
var material_2 = require("@angular/material");
var keypad_component_1 = require("./keypad/keypad.component");
var page_not_found_component_1 = require("./page-not-found/page-not-found.component");
var MuComponentsModule = /** @class */ (function () {
    function MuComponentsModule() {
    }
    MuComponentsModule_1 = MuComponentsModule;
    MuComponentsModule.forRoot = function () {
        return {
            ngModule: MuComponentsModule_1,
            providers: [
                translate_1.TRANSLATION_PROVIDERS,
                translate_1.TranslateService
            ]
        };
    };
    var MuComponentsModule_1;
    MuComponentsModule = MuComponentsModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                flex_layout_1.FlexLayoutModule,
                mu_components_routing_module_1.MuComponentsRoutingModule,
                form_field_1.MatFormFieldModule,
                datepicker_1.MatDatepickerModule,
                input_1.MatInputModule,
                select_1.MatSelectModule,
                autocomplete_1.MatAutocompleteModule,
                checkbox_1.MatCheckboxModule,
                progress_bar_1.MatProgressBarModule,
                radio_1.MatRadioModule,
                slider_1.MatSliderModule,
                slide_toggle_1.MatSlideToggleModule,
                button_toggle_1.MatButtonToggleModule,
                menu_1.MatMenuModule,
                material_2.MatCardModule,
                material_1.MatRippleModule
            ],
            declarations: [
                bottom_in_component_1.BottomInComponent,
                modal_popup_component_1.ModalPopupComponent,
                loading_component_1.LoadingComponent,
                loading_error_component_1.LoadingErrorComponent,
                loading_overlay_component_1.LoadingOverlayComponent,
                toast_component_1.ToastComponent,
                alert_dialog_component_1.AlertDialogComponent,
                infinite_scroll_component_1.InfiniteScrollComponent,
                filter_component_1.FilterComponent,
                input_container_component_1.InputContainerComponent,
                mu_data_table_component_1.MuDataTableComponent,
                dialer_component_1.DialerComponent,
                file_upload_component_1.FileUploadComponent,
                mu_form_container_component_1.MuFormContainerComponent,
                page_not_found_component_1.PageNotFoundComponent,
                directives_1.NcAutoFocusDirective,
                directives_1.NcMaxLengthDirective,
                directives_1.LongPressDirective,
                directives_1.NcStyleClassDirective,
                directives_1.NextInpFocusDirective,
                directives_1.AdjustElementsDirective,
                directives_1.NcFallbackCharDirective,
                directives_1.KeyboardDirective,
                translate_1.TranslatePipe,
                pipes_1.GenericPipe,
                keypad_component_1.KeypadComponent
            ],
            entryComponents: [
                alert_dialog_component_1.AlertDialogComponent,
                keypad_component_1.KeypadComponent
            ],
            exports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                bottom_in_component_1.BottomInComponent,
                modal_popup_component_1.ModalPopupComponent,
                loading_component_1.LoadingComponent,
                loading_error_component_1.LoadingErrorComponent,
                loading_overlay_component_1.LoadingOverlayComponent,
                toast_component_1.ToastComponent,
                infinite_scroll_component_1.InfiniteScrollComponent,
                filter_component_1.FilterComponent,
                input_container_component_1.InputContainerComponent,
                mu_data_table_component_1.MuDataTableComponent,
                dialer_component_1.DialerComponent,
                keypad_component_1.KeypadComponent,
                mu_form_container_component_1.MuFormContainerComponent,
                page_not_found_component_1.PageNotFoundComponent,
                directives_1.NcAutoFocusDirective,
                directives_1.NcMaxLengthDirective,
                directives_1.LongPressDirective,
                directives_1.NcStyleClassDirective,
                directives_1.NextInpFocusDirective,
                directives_1.AdjustElementsDirective,
                directives_1.NcFallbackCharDirective,
                directives_1.KeyboardDirective,
                translate_1.TranslatePipe,
                pipes_1.GenericPipe,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                flex_layout_1.FlexLayoutModule,
                radio_1.MatRadioModule,
                progress_bar_1.MatProgressBarModule,
                slide_toggle_1.MatSlideToggleModule,
                button_toggle_1.MatButtonToggleModule,
                menu_1.MatMenuModule,
                material_1.MatRippleModule
            ],
            providers: [
                custom_breakpoints_1.CustomBreakPointsProvider
            ]
        })
    ], MuComponentsModule);
    return MuComponentsModule;
}());
exports.MuComponentsModule = MuComponentsModule;
//# sourceMappingURL=mu-components.module.js.map