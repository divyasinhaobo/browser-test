"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoutingStrategy = /** @class */ (function () {
    function RoutingStrategy() {
        this.preserveComponents = [];
        this.myStore = {};
        this.logging = false;
    }
    RoutingStrategy.prototype.shouldDetach = function (route) {
        if (this.logging)
            console.info('RoutingStrategy:shouldDetach', this.logSnapshot(route), route);
        return this.isRemembered(route);
    };
    RoutingStrategy.prototype.store = function (route, handle) {
        if (this.logging)
            console.info('RoutingStrategy:store', this.logSnapshot(route), route);
        var name = this.getName(route);
        if (!name)
            return;
        this.myStore[name] = handle;
    };
    RoutingStrategy.prototype.shouldAttach = function (route) {
        if (this.logging)
            console.info('RoutingStrategy:shouldAttach', this.logSnapshot(route), route);
        // return this.isRemembered(route)
        var name = this.getName(route);
        return name ? !!this.myStore[name] : false;
    };
    RoutingStrategy.prototype.retrieve = function (route) {
        if (this.logging)
            console.info('RoutingStrategy:retrieve', this.logSnapshot(route), route);
        var name = this.getName(route);
        if (!name)
            return null;
        return this.myStore[name];
    };
    RoutingStrategy.prototype.shouldReuseRoute = function (future, curr) {
        if (this.logging)
            console.info('RoutingStrategy:shouldReuseRoute', future, this.logSnapshot(future), curr, this.logSnapshot(curr));
        return future.routeConfig === curr.routeConfig;
    };
    RoutingStrategy.prototype.logSnapshot = function (route) {
        var name = this.getName(route);
        return (name || 'null') + ':' +
            (route.url && route.url.length ? route.url[0] : 'none');
    };
    RoutingStrategy.prototype.isRemembered = function (route) {
        var name = this.getName(route);
        return name ? this.preserveComponents.indexOf(name) !== -1 : false;
    };
    RoutingStrategy.prototype.getName = function (route) {
        if (!route.component)
            return '';
        return route.component.name;
    };
    return RoutingStrategy;
}());
exports.RoutingStrategy = RoutingStrategy;
//# sourceMappingURL=routing-strategy.js.map