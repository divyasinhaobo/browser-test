"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
var BottomFlyIn;
(function (BottomFlyIn) {
    BottomFlyIn.ANIM_DURATION = '.4s', BottomFlyIn.STAGGER_DURATION = 50, BottomFlyIn.ANIMATION_STYLE = 'ease-out', BottomFlyIn.FLY_STATE = 'fly', BottomFlyIn.DONT_FLY_STATE = 'dontFly';
    BottomFlyIn.bottomFlyIn = animations_1.trigger('bottomFlyIn', [
        animations_1.transition("* => " + BottomFlyIn.FLY_STATE, [
            animations_1.query('.flex-box-child', [
                animations_1.style({
                    transform: 'translate3d(0, 200%, 0)',
                    opacity: 0
                }),
                animations_1.stagger(BottomFlyIn.STAGGER_DURATION, [
                    animations_1.animate(BottomFlyIn.ANIM_DURATION + " " + BottomFlyIn.ANIMATION_STYLE, animations_1.style({
                        transform: 'translate3d(0, 0, 0)',
                        opacity: 1
                    }))
                ])
            ], { optional: true })
        ])
    ]);
})(BottomFlyIn = exports.BottomFlyIn || (exports.BottomFlyIn = {}));
//# sourceMappingURL=bottom-fly-in.js.map