"use strict";
/*------------------------------------------------------------------------------
   About        : <Write about the file here>
   
   Created on   : Sat Jul 15 2017
   Author       : Raghvendra Varma
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.EVENT_PREFIX = 'mui-event';
var EventSystem;
(function (EventSystem) {
    function broadcast(rc, eventName, data) {
        data = data || {};
        var fullName = eventName.startsWith(exports.EVENT_PREFIX) ? "" + eventName : exports.EVENT_PREFIX + "-" + eventName, nodeList = document.querySelectorAll('.' + fullName), event = new CustomEvent(fullName, { detail: { data: data, rc: rc } });
        for (var index = 0; index < nodeList.length; index++) {
            var element = nodeList[index];
            element.dispatchEvent(event);
        }
        window.dispatchEvent(event);
        rc.isStatus() && rc.status('EventSystem.broadcast', 'Completed broadcast of', fullName, 'to', nodeList.length, 'dom element(s) and to global components via window');
    }
    EventSystem.broadcast = broadcast;
    function eventToElements(rc, eventName, elementClassName, data) {
        var fullName = eventName.startsWith(exports.EVENT_PREFIX) ? "" + eventName : exports.EVENT_PREFIX + "-" + eventName, nodeList = document.querySelectorAll('.' + elementClassName), event = new CustomEvent(fullName, { detail: { data: data, rc: rc } });
        for (var index = 0; index < nodeList.length; index++) {
            var element = nodeList[index];
            element.dispatchEvent(event);
        }
        rc.isStatus() && rc.status('EventSystem.eventToElement', 'Completed event dispatch of', fullName, 'to', nodeList.length, 'dom element(s)');
    }
    EventSystem.eventToElements = eventToElements;
    // Allows subscription of event for an element (when Angular syntax cannot be used)
    // UnSubscribe is automatic on element destroy
    function elementSubscribe(element, eventName, cb) {
        if (!eventName.startsWith(exports.EVENT_PREFIX))
            eventName = exports.EVENT_PREFIX + "-" + eventName;
        var classes = element.className.split(' ');
        if (classes.indexOf(eventName) === -1) {
            classes.push(eventName);
            element.className = classes.join(' ');
        }
        else {
            element.removeEventListener(eventName, cb);
        }
        element.addEventListener(eventName, cb);
    }
    EventSystem.elementSubscribe = elementSubscribe;
    // Any class whose object is globally alive in the app should use this 
    // since it does not unsubscribe for the events
    // UnSubscribe is ********* NEVER *********
    function subscribe(eventName, cb, options) {
        if (!eventName.startsWith(exports.EVENT_PREFIX))
            eventName = exports.EVENT_PREFIX + "-" + eventName;
        window.addEventListener(eventName, cb, options);
    }
    EventSystem.subscribe = subscribe;
    function subscribeAll(eventNames, cb) {
        eventNames.forEach(function (eventName) {
            if (!eventName.startsWith(exports.EVENT_PREFIX))
                eventName = exports.EVENT_PREFIX + "-" + eventName;
            window.addEventListener(eventName, cb.bind(null, eventName));
        });
    }
    EventSystem.subscribeAll = subscribeAll;
})(EventSystem = exports.EventSystem || (exports.EventSystem = {}));
//# sourceMappingURL=event-broadcast.js.map