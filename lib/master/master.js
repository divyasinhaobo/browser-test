"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Wed Jul 19 2017
   Author     : Raghvendra Varma
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
var master_db_1 = require("./master-db");
var Master = /** @class */ (function () {
    function Master() {
    }
    Master.field = function (optional) {
        return function (target, propertyKey) {
            var type = Reflect.getMetadata('design:type', target, propertyKey), name = master_db_1.MasterDb.getModelName(target.constructor);
            master_db_1.MasterDb.registerSchema(name, propertyKey, false, Master.getType(type), !!optional);
        };
    };
    Master.key = function (modelName) {
        return function (target, propertyKey) {
            if (modelName)
                master_db_1.MasterDb.registerModelClass(modelName, target.constructor);
            var type = Reflect.getMetadata('design:type', target, propertyKey), name = master_db_1.MasterDb.getModelName(target.constructor);
            master_db_1.MasterDb.registerSchema(name, propertyKey, true, Master.getType(type), false);
        };
    };
    Master.getType = function (fieldType) {
        switch (fieldType) {
            case String: return 'string';
            case Number: return 'number';
            case Boolean: return 'boolean';
            case Array: return 'array';
            case Object: return 'object';
            default:
                var msg = 'getType: unknown field type - ' + fieldType;
                // console.log(msg)
                throw (new Error(msg));
        }
    };
    return Master;
}());
exports.Master = Master;
//# sourceMappingURL=master.js.map