"use strict";
/*------------------------------------------------------------------------------
   About      : Common interface for master data sync
   
   Created on : Tue Jul 18 2017
   Author     : Raghvendra Varma
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/*------------------------------------------------------------------------------
  Here are the changes wrt prepaid structure:

  1) The _id concept is gone from the db, hence all individual keys are sent. Del
     array would always key name preceeding the key value.

  2) Few fields are named differently like sync_hash is just hash

  3) Response only sends sync hash of modified data structures

  4) Please note all the modified structures

------------------------------------------------------------------------------*/
exports.Segment = {
    version: 'version'
};
exports.MASTER_UPDATE_EVENT = 'mubble-master-update';
//# sourceMappingURL=index.js.map