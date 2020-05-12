import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
export declare class RoutingStrategy implements RouteReuseStrategy {
    private preserveComponents;
    private myStore;
    private logging;
    shouldDetach(route: ActivatedRouteSnapshot): boolean;
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void;
    shouldAttach(route: ActivatedRouteSnapshot): boolean;
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle;
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean;
    private logSnapshot;
    private isRemembered;
    private getName;
}
