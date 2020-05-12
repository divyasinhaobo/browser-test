"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Tue Oct 17 2017
   Author     : Raghvendra Varma
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
var Core;
(function (Core) {
    // This function protects an object / array from modifications
    function protect(inp) {
        Object.freeze(inp);
    }
    Core.protect = protect;
})(Core = exports.Core || (exports.Core = {}));
//# sourceMappingURL=core.js.map