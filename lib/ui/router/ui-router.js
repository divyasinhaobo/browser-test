"use strict";
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
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Fri Jun 16 2017
   Author     : Raghvendra Varma
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
var router_1 = require("@angular/router");
var injection_interface_1 = require("../mu-components/injection-interface");
var alert_dialog_component_1 = require("../mu-components/alert-dialog/alert-dialog.component");
var shared_router_constants_1 = require("./shared-router-constants");
var isEqual_1 = require("lodash/isEqual");
var ROOT_URL = '#/?launched=true';
var hashIndex = location.href.indexOf('#'), baseHref = hashIndex !== -1 ? location.href.substr(0, hashIndex) : location.href;
var BASE_HREF = baseHref;
exports.PRIMARY_OUTLET = 'primary', exports.MODAL_OUTLET = 'modal';
var TOAST_POSITION;
(function (TOAST_POSITION) {
    TOAST_POSITION[TOAST_POSITION["TOP"] = 1] = "TOP";
    TOAST_POSITION[TOAST_POSITION["MIDDLE"] = 2] = "MIDDLE";
    TOAST_POSITION[TOAST_POSITION["BOTTOM"] = 3] = "BOTTOM";
})(TOAST_POSITION = exports.TOAST_POSITION || (exports.TOAST_POSITION = {}));
var NavMethod;
(function (NavMethod) {
    NavMethod[NavMethod["NEXT"] = 1] = "NEXT";
    NavMethod[NavMethod["CURRENT"] = 2] = "CURRENT";
    NavMethod[NavMethod["POP"] = 3] = "POP";
})(NavMethod = exports.NavMethod || (exports.NavMethod = {}));
var StackItem = /** @class */ (function () {
    function StackItem() {
    }
    return StackItem;
}());
var OutletEntry = /** @class */ (function () {
    function OutletEntry(component) {
        this.component = null;
        this.invCount = 0;
        this.component = component;
    }
    return OutletEntry;
}());
var UiRouter = /** @class */ (function () {
    function UiRouter(rcBrowser, router) {
        this.rcBrowser = rcBrowser;
        this.router = router;
        this.componentRegistry = {};
        // variables for navigation
        this.urlStack = [];
        this.warnedUser = false;
        this.firstNavDone = false;
        this.browserStack = [];
        this.lastNavMethod = 0;
        this.lastPopIndex = -1;
        this.lastNavUrl = '';
        this.lastGoingBack = false;
        this.currentQpId = '';
        this.curCompMap = {};
        this.codePop = false;
        this.runningInBrowser = false;
        this.isSdkApp = false;
    }
    UiRouter.prototype.init = function (runningInBrowser, isSdkApp) {
        if (isSdkApp === void 0) { isSdkApp = false; }
        this.runningInBrowser = runningInBrowser;
        this.isSdkApp = isSdkApp;
        this.historyWrapper = new HistoryWrapper(this.rcBrowser, this.isSdkApp);
        this.urlStack[0] = new StackItem();
        this.urlStack[0].url = (location.hash || '').substr(1);
        this.historyWrapper.replaceState({ index: -1 }, document.title, baseHref + ROOT_URL);
        this.historyWrapper.pushState({ index: 0 }, document.title, baseHref);
        if (!this.isSdkApp)
            window.addEventListener('popstate', this.onPopState.bind(this));
        this.browserStack[0] = this.urlStack[0].url;
        this.router.events.subscribe(this.onNavEnd.bind(this));
        this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'initialized with', {
            url: this.urlStack[0].url
        });
    };
    UiRouter.prototype.navigate = function (routeTo, extras) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (extras && extras.replaceAllUrls) {
                            if (this.urlStack.length - 1 > 0) {
                                extras.replaceIndex = 1;
                            }
                        }
                        return [4 /*yield*/, this.navigateByUrl([routeTo], extras)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UiRouter.prototype.rootNavigate = function (routeTo, extras) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.rcBrowser.isStatus() && this.rcBrowser.status(this.rcBrowser.getName(this), 'Inside RootNavigate', routeTo);
                        if (!extras)
                            extras = {};
                        extras.replaceIndex = 0;
                        return [4 /*yield*/, this.navigateByUrl([routeTo], extras, exports.PRIMARY_OUTLET)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UiRouter.prototype.areWeGoingBack = function () {
        return this.lastGoingBack;
    };
    UiRouter.prototype.isModalActive = function () {
        return Object.keys(this.curCompMap).length !== 1;
    };
    UiRouter.prototype.isShowingPopup = function () {
        return this.curOutlet !== exports.PRIMARY_OUTLET;
    };
    UiRouter.prototype.navigateByUrl = function (urlOrCommand, extras, outlet) {
        return __awaiter(this, void 0, void 0, function () {
            var nc_paramsId, modalRoute, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!extras)
                            extras = {};
                        if (!extras.queryParams)
                            extras.queryParams = {};
                        this.lastNavMethod && this.rcBrowser.isError() && this.rcBrowser.error(this.rcBrowser.getName(this), 'Navigating while last navigation not complete, possibly double nav...');
                        if (extras.replaceIndex === undefined) {
                            this.lastNavMethod = extras.replaceUrl ? NavMethod.CURRENT : NavMethod.NEXT;
                            this.lastPopIndex = -1;
                            this.rcBrowser.isStatus() && this.rcBrowser.status(this.rcBrowser.getName(this), 'Routing to', urlOrCommand, 'with', extras);
                            this.lastGoingBack = false;
                        }
                        else {
                            this.lastGoingBack = true;
                            if (extras.replaceIndex >= this.urlStack.length) {
                                this.rcBrowser.isError() && this.rcBrowser.error(this.rcBrowser.getName(this), 'Ignoring navigation to replaceIndex that is more than number of items in stack', { replaceIndex: extras.replaceIndex, urlStackLength: this.urlStack.length });
                                extras.replaceIndex = this.urlStack.length - 1;
                            }
                            this.lastNavMethod = NavMethod.POP;
                            this.lastPopIndex = extras.replaceIndex;
                            this.rcBrowser.isStatus() && this.rcBrowser.status(this.rcBrowser.getName(this), 'navigateByUrl: Route back by', extras.replaceIndex - this.urlStack.length + 1, 'to url', urlOrCommand);
                        }
                        // prepare extras
                        delete extras.replaceUrl;
                        extras.skipLocationChange = true;
                        nc_paramsId = extras.paramsId || 'qp' + Date.now();
                        if (extras.queryParams) {
                            modalRoute = extras.queryParams.modalRoute;
                        }
                        this.currentQpId = nc_paramsId;
                        this.curQueryParam = extras.queryParams;
                        extras.queryParams = modalRoute ? { nc_paramsId: nc_paramsId, modalRoute: modalRoute } : { nc_paramsId: nc_paramsId };
                        this.curOutlet = outlet || exports.PRIMARY_OUTLET;
                        url = Array.isArray(urlOrCommand) ? this.router.createUrlTree(urlOrCommand, extras) : urlOrCommand;
                        this.lastNavUrl = typeof url === 'string' ? url : this.router.serializeUrl(url);
                        return [4 /*yield*/, this.router.navigateByUrl(url, extras)];
                    case 1:
                        if (_a.sent()) {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UiRouter.prototype.popupBottomIn = function (component, componentRoute, queryParams, replaceUrl, caller) {
        if (!queryParams)
            queryParams = {};
        var repUrl = replaceUrl || false;
        this.showInModal(component, componentRoute, queryParams, shared_router_constants_1.ComponentRoutes.BottomIn, caller, repUrl);
    };
    UiRouter.prototype.popupModal = function (component, componentRoute, queryParams, replaceUrl, caller) {
        if (!queryParams)
            queryParams = {};
        var repUrl = replaceUrl || false;
        this.showInModal(component, componentRoute, queryParams, shared_router_constants_1.ComponentRoutes.Modal, caller, repUrl);
    };
    UiRouter.prototype.showAlertDialog = function (queryParams, caller, replaceUrl) {
        this.popupModal(alert_dialog_component_1.AlertDialogComponent, shared_router_constants_1.ComponentRoutes.Alert, queryParams, replaceUrl, caller);
    };
    UiRouter.prototype.hasQueryParamsById = function (params) {
        return !!params.nc_paramsId;
    };
    UiRouter.prototype.getUrlStackLength = function () {
        return this.urlStack.length;
    };
    UiRouter.prototype.getCurrentComponent = function (outlet) {
        if (outlet === void 0) { outlet = exports.PRIMARY_OUTLET; }
        return this.curCompMap[outlet];
    };
    UiRouter.prototype.getCurrentRouteName = function () {
        var topUrl = this.urlStack[this.urlStack.length - 1].url;
        return this.getRouteName(topUrl);
    };
    UiRouter.prototype.onNavCancel = function () {
        this.lastNavMethod = 0;
    };
    UiRouter.prototype.getCurQueryParams = function () {
        return this.curQueryParam;
    };
    UiRouter.prototype.getRouteName = function (url) {
        var urlTree = this.router.parseUrl(url);
        var segments = urlTree.root.children.primary ? urlTree.root.children.primary.segments : undefined;
        if (!segments) {
            //we are adding dummy url (#/?launched=true) in the beginning.
            this.rcBrowser.isWarn() && this.rcBrowser.warn(this.rcBrowser.getName(this), "received invalid url " + url);
            return '';
        }
        if (segments.length > 1) {
            var path_1 = '';
            segments.forEach(function (segment, index) {
                path_1 += segment + (index < segments.length - 1 ? '/' : '');
            });
            return path_1;
        }
        return segments[0].path;
    };
    UiRouter.prototype.getModuleName = function (url) {
        var urlTree = this.router.parseUrl(url);
        var segments = urlTree.root.children.primary.segments;
        return segments[0].path;
    };
    UiRouter.prototype.getCurrentQueryParams = function () {
        return this.curQueryParam;
    };
    UiRouter.prototype.getQueryParams = function (params) {
        var nc_paramsId = params.nc_paramsId;
        this.rcBrowser.isAssert() && this.rcBrowser.assert(this.rcBrowser.getName(this), nc_paramsId && nc_paramsId === this.currentQpId, 'Trying to retrieve non-existent params', params, this.currentQpId);
        return this.curQueryParam;
    };
    UiRouter.prototype.updateQueryParam = function (name, value) {
        var stackItem = this.urlStack[this.urlStack.length - 1], queryParam = stackItem.queryParam;
        this.rcBrowser.isAssert() && this.rcBrowser.assert(this.rcBrowser.getName(this), queryParam, 'Your component does not get params by id');
        queryParam[name] = value;
    };
    UiRouter.prototype.setComponentForOutlet = function (component, outlet) {
        outlet = outlet || exports.PRIMARY_OUTLET;
        this.rcBrowser.isAssert() && this.rcBrowser.assert(this.rcBrowser.getName(this), component);
        var oldEntry = this.curCompMap[outlet];
        if (oldEntry && oldEntry.component === component)
            return;
        this.curCompMap[outlet] = new OutletEntry(component);
    };
    UiRouter.prototype.removeComponentForOutlet = function (component, outlet) {
        outlet = outlet || exports.PRIMARY_OUTLET;
        this.rcBrowser.isAssert() && this.rcBrowser.assert(this.rcBrowser.getName(this), this.curCompMap[outlet].component === component);
        delete this.curCompMap[outlet];
    };
    UiRouter.prototype.showInModal = function (component, componentRoute, queryParams, type, caller, replaceUrl) {
        var compName = component.name;
        this.registerComponent(compName, component);
        queryParams[injection_interface_1.INJECTION_PARAM.INJECT] = compName;
        if (caller)
            queryParams[injection_interface_1.INJECTION_PARAM.CALLER] = caller;
        queryParams.modalRoute = '(' + componentRoute + ')';
        var repUrl = replaceUrl || false;
        this.rcBrowser.isStatus() && this.rcBrowser.status(this.rcBrowser.getName(this), "Popping up " + type + " for " + compName);
        this.navigateByUrl([{ outlets: { modal: type } }], { replaceUrl: repUrl,
            queryParams: queryParams }, exports.MODAL_OUTLET);
    };
    UiRouter.prototype.showModalPage = function (componentRoute, queryParams, replaceUrl) {
        queryParams.modalRoute = '(' + componentRoute + ')';
        var repUrl = replaceUrl || false;
        this.navigateByUrl([{ outlets: { modal: componentRoute } }], { replaceUrl: repUrl, queryParams: queryParams }, exports.MODAL_OUTLET);
    };
    UiRouter.prototype.goBack = function (whereOrByHowMuch) {
        if (!this.canGoBack())
            return;
        if (this.isModalActive()) {
            this.onPopUpClosed();
        }
        return this.goBackInternal(whereOrByHowMuch);
    };
    UiRouter.prototype.goBackInternal = function (whereOrByHowMuch) {
        var stackLen = this.urlStack.length;
        var index = typeof whereOrByHowMuch === 'number' ? stackLen + whereOrByHowMuch - 1 : stackLen - 2, where = typeof whereOrByHowMuch === 'string' ? whereOrByHowMuch : '';
        this.rcBrowser.isAssert() && this.rcBrowser.assert(this.rcBrowser.getName(this), index >= 0 && index < stackLen, { stackLen: stackLen, whereOrByHowMuch: whereOrByHowMuch, where: where, index: index });
        if (where) {
            if (!where.startsWith('/'))
                where = '/' + where;
            for (; index >= 0; index--) {
                if (this.urlStack[index].url.startsWith(where))
                    break;
            }
            if (index === -1) {
                this.rcBrowser.isError() && this.rcBrowser.error(this.rcBrowser.getName(this), 'Could not find the desired url:', where, this.urlStack);
                throw (new Error('Could not find the desired url: ' + where));
            }
        }
        var urlStack = this.urlStack[index], ne = { replaceUrl: true };
        if (urlStack.qpId) {
            ne.paramsId = urlStack.qpId;
            ne.queryParams = urlStack.queryParam;
        }
        ne.replaceIndex = index;
        this.navigateByUrl(urlStack.url, ne, urlStack.outlet);
    };
    /*--------------------------------------------------------------------------------------------------------------
      History Stack management
    --------------------------------------------------------------------------------------------------------------*/
    UiRouter.prototype.onPopState = function (e) {
        var index = this.historyWrapper.getState().index, stackLen = this.urlStack.length;
        this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'onPopState', { stackLen: stackLen, index: index });
        this.rcBrowser.isAssert() && this.rcBrowser.assert(this.rcBrowser.getName(this), typeof index === 'number' &&
            index < (stackLen - 1), { stackLen: stackLen, index: index });
        if (index === -1) {
            if (!this.codePop) {
                if (!this.canCompGoBack()) {
                    return;
                }
                if (this.warnedUser || this.runningInBrowser) {
                    this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'onPopState: Exiting the app', this.historyWrapper.getLength());
                    this.notifyAppClose();
                    if (!this.runningInBrowser)
                        this.notifyAppClose();
                    else
                        this.historyWrapper.go(-1);
                    return;
                }
                else {
                    this.warnedUser = this.notifyUserBackPress();
                }
            }
            else {
                this.codePop = false;
            }
            this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'onPopState: Winding up stack on back to first item');
            for (var i = 0; i < stackLen; i++) {
                this.browserStack[i] = this.urlStack[i].url;
                this.historyWrapper.pushState({ index: i }, '', BASE_HREF + '#' + this.urlStack[i].url);
            }
            this.browserStack.length = stackLen;
        }
        else {
            if (!this.canCompGoBack()) {
                return;
            }
            if (this.isModalActive()) {
                this.onPopUpClosed();
            }
            var goBackBy = index - stackLen + 1;
            this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'onPopState: Going back by', { index: index, goBackBy: goBackBy });
            this.goBackInternal(goBackBy);
        }
    };
    UiRouter.prototype.canCompGoBack = function () {
        if (!this.canGoBack() || this.isToolTipShown()) {
            var lastIdx = this.urlStack.length - 1, lastItem = this.urlStack[lastIdx];
            this.historyWrapper.pushState({ index: lastIdx }, '', BASE_HREF + '#' + lastItem.url);
            this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'not going back');
            return false;
        }
        return true;
    };
    UiRouter.prototype.onPopUpClosed = function () {
        var lastIdx = this.urlStack.length - 1, lastItem = this.urlStack[lastIdx];
        if (!lastItem)
            return;
        var comp = this.curCompMap[lastItem.outlet];
        if (!comp || !comp.component.onBackPressed)
            return;
        comp.component.onBackPressed();
    };
    UiRouter.prototype.canGoBack = function () {
        var lastIdx = this.urlStack.length - 1, lastItem = this.urlStack[lastIdx];
        if (!lastItem)
            return true;
        var comp = this.curCompMap[lastItem.outlet];
        if (!comp || !comp.component.canGoBack) {
            this.removeOverlayIfExists();
            return true;
        }
        if (!comp.component.canGoBack()) {
            this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'Skipping back as component dis-allowed back press');
            return false;
        }
        else {
            this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'Going back as component allowed back press');
            return true;
        }
    };
    UiRouter.prototype.onNavEnd = function (event) {
        if (!(event instanceof router_1.NavigationEnd)) {
            return;
        }
        if (!this.firstNavDone) {
            this.firstNavDone = true;
            if (!this.lastNavMethod) {
                this.lastNavMethod = NavMethod.CURRENT;
                this.lastNavUrl = event.url;
                this.curOutlet = exports.PRIMARY_OUTLET;
            }
            var url = location.href, hashPtr = url.indexOf('#');
            var urlPrefix = hashPtr === -1 ? url : url.substr(0, hashPtr);
        }
        this.rcBrowser.isStatus() && this.rcBrowser.status(this.rcBrowser.getName(this), 'NavigationEnd', {
            url: event.url,
            lastNavMethod: NavMethod[this.lastNavMethod],
            lastPopIndex: this.lastPopIndex,
            lastNavUrl: this.lastNavUrl,
            stackLength: this.urlStack.length
        });
        this.lastNavUrl !== event.url && this.rcBrowser.isError() && this.rcBrowser.error(this.rcBrowser.getName(this), 'onNavEnd without matching url desired:' + this.lastNavUrl + ' actual:' + event.url);
        var refIndex;
        if (this.lastNavMethod === NavMethod.POP) {
            refIndex = this.lastPopIndex;
        }
        else if (this.lastNavMethod === NavMethod.NEXT) {
            refIndex = this.urlStack.length;
        }
        else if (this.lastNavMethod === NavMethod.CURRENT) {
            refIndex = this.urlStack.length - 1;
        }
        else {
            this.rcBrowser.isError() && this.rcBrowser.error(this.rcBrowser.getName(this), 'Got a navigation without navMethod', this.urlStack, location.href);
            throw ('Got a navigation without navMethod');
        }
        var outletEntry = this.curCompMap[this.curOutlet];
        if (!outletEntry) {
            this.rcBrowser.isError() && this.rcBrowser.error(this.rcBrowser.getName(this), 'Current component is not known', {
                url: event.url,
                lastNavMethod: NavMethod[this.lastNavMethod],
                lastPopIndex: this.lastPopIndex,
                stackLength: this.urlStack.length
            });
        }
        this.onMubbleScreenChange(event.url, this.curOutlet, this.lastNavMethod);
        if (this.urlStack.length === refIndex)
            this.urlStack[refIndex] = new StackItem();
        var urlStack = this.urlStack[refIndex];
        urlStack.url = event.url;
        urlStack.qpId = this.currentQpId;
        urlStack.queryParam = this.curQueryParam;
        urlStack.outlet = this.curOutlet;
        this.urlStack.length = refIndex + 1;
        this.rcBrowser.isStatus() && this.rcBrowser.status(this.rcBrowser.getName(this), 'Current Url stack', this.urlStack[refIndex].url);
        this.lastNavMethod = 0;
        this.lastPopIndex = -1;
        this.lastNavUrl = '';
        this.curOutlet = null;
        this.setComponentParams(outletEntry);
        // When we remove the getParamsById function
        // this.currentQpId    = ''
        // this.curQueryParam  = null
        if (this.warnedUser)
            this.warnedUser = false;
        if (!this.isSdkApp)
            this.syncBrowserHistory();
        this.onMubbleScreenNavEnd(event.url, this.lastNavMethod);
    };
    UiRouter.prototype.setComponentParams = function (outletEntry) {
        if (!outletEntry.component.onRouterInit)
            return;
        var params = this.router.routerState.root.snapshot.queryParams, qp = params.nc_paramsId ? this.curQueryParam : params;
        if (isEqual_1.default(qp, outletEntry.lastParams)) {
            this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'Skipping onRouterInit as parameters are same');
            return;
        }
        outletEntry.component.onRouterInit(qp, !outletEntry.invCount);
        outletEntry.invCount++;
        outletEntry.lastParams = qp;
    };
    UiRouter.prototype.syncBrowserHistory = function () {
        var browserStack = this.browserStack, urlStack = this.urlStack, stackLen = urlStack.length;
        var fromIndex = -1;
        // sync browserStack
        for (var index = 0; index < stackLen; index++) {
            if (fromIndex === -1 &&
                (browserStack.length === index || browserStack[index] !== urlStack[index].url)) {
                fromIndex = index;
                break;
            }
        }
        // this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'syncBrowserHistory', 
        //   {fromIndex, stackLen, browserStackLen: browserStack.length})
        if (fromIndex === -1) {
            if (urlStack.length !== browserStack.length)
                this.browserGotoRoot();
        }
        else if (fromIndex === (stackLen - 1)) {
            if (browserStack.length === urlStack.length) {
                this.historyWrapper.replaceState({ index: fromIndex }, '', BASE_HREF + '#' + urlStack[fromIndex]);
                browserStack[fromIndex] = urlStack[fromIndex].url;
            }
            else if (browserStack.length + 1 === urlStack.length) {
                this.historyWrapper.pushState({ index: fromIndex }, '', BASE_HREF + '#' + urlStack[fromIndex]);
                browserStack[fromIndex] = urlStack[fromIndex].url;
            }
            else {
                this.browserGotoRoot();
            }
        }
        else {
            this.browserGotoRoot();
        }
    };
    UiRouter.prototype.browserGotoRoot = function () {
        this.rcBrowser.isAssert() && this.rcBrowser.assert(this.rcBrowser.getName(this), this.historyWrapper.getState().index >= 0);
        var distanceFromRoot = -1 * this.historyWrapper.getState().index - 1;
        this.rcBrowser.isDebug() && this.rcBrowser.debug(this.rcBrowser.getName(this), 'browserGotoRoot', {
            distanceFromRoot: distanceFromRoot,
            stackLen: this.urlStack.length,
            browserStackLen: this.browserStack.length
        });
        this.codePop = true;
        this.historyWrapper.go(distanceFromRoot);
    };
    /*--------------------------------------------------------------------------------------------------------------
      Register components for reference by rest of the system
    --------------------------------------------------------------------------------------------------------------*/
    UiRouter.prototype.registerComponent = function (compName, component) {
        var oldComponent = this.componentRegistry[compName];
        if (oldComponent === component)
            return;
        this.componentRegistry[compName] = component;
        this.rcBrowser.isStatus() && this.rcBrowser.status(this.rcBrowser.getName(this), 'Registered component with name', compName);
    };
    UiRouter.prototype.getComponent = function (compName) {
        return this.componentRegistry[compName];
    };
    UiRouter.prototype.onMubbleScreenChange = function (url, outlet, lastNavMethod) {
    };
    UiRouter.prototype.onMubbleScreenNavEnd = function (url, lastNavMethod) {
    };
    UiRouter.prototype.notifyUserBackPress = function () {
        return true;
    };
    UiRouter.prototype.notifyAppClose = function () {
    };
    UiRouter.prototype.isToolTipShown = function () {
        return true;
    };
    UiRouter.prototype.removeOverlayIfExists = function () {
    };
    return UiRouter;
}());
exports.UiRouter = UiRouter;
var HistoryWrapper = /** @class */ (function () {
    function HistoryWrapper(rc, isSdkApp) {
        this.rc = rc;
        this.isSdkApp = isSdkApp;
        rc.setupLogger(this, 'HistoryWrapper');
    }
    HistoryWrapper.prototype.pushState = function (state, title, url) {
        if (this.isSdkApp)
            return;
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'before pushState', {
            historyLength: history.length,
            historyState: history.state,
            newState: state
        });
        history.pushState(state, title, url);
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'after pushState', {
            historyLength: history.length,
            historyState: history.state
        });
    };
    HistoryWrapper.prototype.replaceState = function (state, title, url) {
        if (this.isSdkApp)
            return;
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'before replaceState', {
            historyLength: history.length,
            historyState: history.state,
            title: title,
            url: url,
            newState: state
        });
        history.replaceState(state, title, url);
        this.rc.isDebug() && this.rc.debug(this.rc.getName(this), 'after replaceState', {
            historyLength: history.length,
            historyState: history.state
        });
    };
    HistoryWrapper.prototype.go = function (delta) {
        if (this.isSdkApp)
            return;
        history.go(delta);
    };
    HistoryWrapper.prototype.getState = function () {
        if (this.isSdkApp)
            return;
        return history.state;
    };
    HistoryWrapper.prototype.getLength = function () {
        if (this.isSdkApp)
            return;
        return history.length;
    };
    return HistoryWrapper;
}());
//# sourceMappingURL=ui-router.js.map