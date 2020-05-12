"use strict";
/*------------------------------------------------------------------------------
   About      : Interfaces for mubble core components that are used by both
                app and server

   Created on : Fri Jan 03 2019
   Author     : Yaswanth Shankar
   
   Copyright (c) 2018 Obopay Mobile Technologies Pvt Ltd. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
var COL_TYPE;
(function (COL_TYPE) {
    COL_TYPE["ICON"] = "ICON";
    COL_TYPE["IMAGE"] = "IMAGE";
    COL_TYPE["BUTTON"] = "BUTTON";
    COL_TYPE["TEXT"] = "TEXT";
    COL_TYPE["EDIT"] = "EDIT";
    COL_TYPE["TOGGLE"] = "TOGGLE";
    COL_TYPE["HYPER_LINK"] = "HYPER_LINK";
    COL_TYPE["MORE_DETAILS"] = "MORE_DETAILS";
    COL_TYPE["MULTI_LINE"] = "MULTI_LINE";
})(COL_TYPE = exports.COL_TYPE || (exports.COL_TYPE = {}));
var DISPLAY_TYPE;
(function (DISPLAY_TYPE) {
    DISPLAY_TYPE["ROW_INPUT_BOX"] = "ROW_INPUT_BOX";
    DISPLAY_TYPE["INPUT_BOX"] = "INPUT_BOX";
    DISPLAY_TYPE["SELECTION_BOX"] = "SELECTION_BOX";
    DISPLAY_TYPE["CALENDAR_BOX"] = "CALENDAR_BOX";
    DISPLAY_TYPE["DATE_RANGE"] = "DATE_RANGE";
    DISPLAY_TYPE["NUMBER_RANGE"] = "NUMBER_RANGE";
    DISPLAY_TYPE["AUTOCOMPLETE_SELECT"] = "AUTO_COMPLETE_SELECT";
    DISPLAY_TYPE["RADIO"] = "RADIO";
    DISPLAY_TYPE["ROW_RADIO"] = "ROW_RADIO";
    DISPLAY_TYPE["TEXT_AREA"] = "TEXT_AREA";
    DISPLAY_TYPE["IMAGE_UPLOAD"] = "IMAGE_UPLOAD";
    DISPLAY_TYPE["TOGGLE"] = "TOGGLE";
    DISPLAY_TYPE["MULTI_CHECK_BOX"] = "MULTI_CHECK_BOX";
    DISPLAY_TYPE["BUTTON_TOGGLE"] = "BUTTON_TOGGLE";
})(DISPLAY_TYPE = exports.DISPLAY_TYPE || (exports.DISPLAY_TYPE = {}));
var DISPLAY_MODE;
(function (DISPLAY_MODE) {
    DISPLAY_MODE["HORIZONTAL"] = "HORIZONTAL";
    DISPLAY_MODE["VERTICAL"] = "VERTICAL";
})(DISPLAY_MODE = exports.DISPLAY_MODE || (exports.DISPLAY_MODE = {}));
var FILTER_MODE;
(function (FILTER_MODE) {
    FILTER_MODE["SEARCH"] = "SEARCH";
    FILTER_MODE["MATCH"] = "MATCH";
    FILTER_MODE["RANGE"] = "RANGE";
    FILTER_MODE["SORT"] = "SORT";
})(FILTER_MODE = exports.FILTER_MODE || (exports.FILTER_MODE = {}));
var SORT_MODE;
(function (SORT_MODE) {
    SORT_MODE["ASC"] = "ASC";
    SORT_MODE["DESC"] = "DESC";
})(SORT_MODE = exports.SORT_MODE || (exports.SORT_MODE = {}));
//# sourceMappingURL=app-server-interfaces.js.map