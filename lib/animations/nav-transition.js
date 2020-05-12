"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
var NavTransition;
(function (NavTransition) {
    NavTransition.ANIM_DURATION = 400, NavTransition.PAGE_TRANSITION_DURATION = NavTransition.ANIM_DURATION + 'ms', NavTransition.IDLE = 'idle', NavTransition.FORWARD = 'forward', NavTransition.BACKWARD = 'backward', NavTransition.ANIMATION_STYLE = 'ease-out';
    NavTransition.pageTransition = animations_1.trigger('pageTransition', [
        animations_1.transition(NavTransition.IDLE + " => " + NavTransition.FORWARD, [
            animations_1.query(':enter, :leave', animations_1.style({ position: 'fixed', width: '100%' }), { optional: true }),
            animations_1.group([
                animations_1.query(':leave', [
                    animations_1.style({ transform: 'translate3d(0, 0, 0)', zIndex: 0 })
                ], { optional: true }),
                animations_1.query(':enter', [
                    animations_1.style({ transform: 'translate3d(100%, 0, 0)', zIndex: 100 }),
                    animations_1.animate(NavTransition.PAGE_TRANSITION_DURATION + " " + NavTransition.ANIMATION_STYLE, animations_1.style({
                        transform: 'translate3d(0, 0, 0)',
                        zIndex: 100
                    }))
                ], { optional: true })
            ])
        ]),
        animations_1.transition(NavTransition.IDLE + " => " + NavTransition.BACKWARD, [
            animations_1.query(':enter, :leave', animations_1.style({ position: 'fixed', width: '100%' }), { optional: true }),
            animations_1.group([
                animations_1.query(':leave', [
                    animations_1.style({ transform: 'translate3d(0, 0, 0)', zIndex: 100 }),
                    animations_1.animate(NavTransition.PAGE_TRANSITION_DURATION + " " + NavTransition.ANIMATION_STYLE, animations_1.style({
                        transform: 'translate3d(100%, 0, 0)',
                        zIndex: 100
                    }))
                ], { optional: true }),
                animations_1.query(':enter', [
                    animations_1.style({ transform: 'translate3d(0, 0, 0)', zIndex: 0 })
                ], { optional: true })
            ])
        ])
    ]);
})(NavTransition = exports.NavTransition || (exports.NavTransition = {}));
//# sourceMappingURL=nav-transition.js.map