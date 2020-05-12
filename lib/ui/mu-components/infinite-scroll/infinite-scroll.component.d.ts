import { EventEmitter, ElementRef, NgZone, Renderer2 } from '@angular/core';
import { Mubble } from '@mubble/core';
interface ListItem {
    type: string;
    params: Mubble.uObject<any>;
}
export declare class InfiniteScrollComponent {
    private element;
    private ngZone;
    private renderer;
    items: ListItem[];
    upperBufferCount: number;
    lowerBufferCount: number;
    listEnd: EventEmitter<number>;
    activeElement: EventEmitter<number>;
    scrollCont: ElementRef;
    contentHolder: ElementRef;
    viewPortItems: any[];
    previousStartIdx: number;
    previousEndIdx: number;
    itemsHeight: {
        [index: number]: number;
    };
    private translateY;
    private scrollHandler;
    private lastScrolledTop;
    private currActiveElemIndex;
    private lastActiveElemIndex;
    constructor(element: ElementRef, ngZone: NgZone, renderer: Renderer2);
    ngOnInit(): void;
    ngOnChanges(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private setInitHolderHeight;
    private calculateHeight;
    private cacheViewedItemsHeight;
    private updateViewPortItems;
    private scrollTo;
    private isElementInViewPort;
    private updateCurrActiveElemIdx;
    scrollToTop(): void;
    scrollToItem(index: number, highlight?: boolean): void;
    getScrollableElement(): any;
    getViewedElementsId(): string[];
    getActiveElementId(firstElem?: boolean): string;
    refreshList(): void;
}
export {};
