import { Mubble } from '@mubble/core';
export declare class DomHelper {
    static addClass(className: string): void;
    static getTransform(xPixel: number, yPixel: number, zPixel: number): Mubble.uObject<string>;
    static getPercentTransform(xPercent: number, yPercent: number): Mubble.uObject<string>;
    static setTransform(elem: any, xPixel: any, yPixel: any, zPixel: any): void;
    static setPercentTransform(elem: any, xPercent: number, yPercent: number): void;
    static getQuickAnim(): string;
}
