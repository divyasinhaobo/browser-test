export declare class TimerInstance {
    private timer;
    name: string;
    cb: () => number;
    nextTickAt: number;
    constructor(timer: Timer, name: string, cb: () => number);
    tickAfter(ms: number, overwrite?: boolean): void;
    remove(): void;
}
/**
 * Timer tickAfter is coded to resemble setTimeout. Here are key differences:
 *
 *  - If you call tickAfter function multiple times, it remembers the lowest time interval at which it should callback.
 *    If you wish to override the stored value, you should pass overwrite flag
 *
 *  - When the chosen time arrives, your callback is called. However, callback processing is special as noted below.
 *
 *  - Callbacks are unique and you are allowed to register only one timer per callback function
 *
 *  - The callback if returns a value, timer is rescheduled to tick after that much time. Returning a 0 will
 *    automatically cancel your subscription. If during the callback processing there is a call to tickAfter/remove
 *    return value is ignored
 *
 *  - It provides as a efficient helper in managing the timer. You need not worry about memory leak, if your cb returns
 *    right value, depending on the situation. A remove function is provided, in case you never return a zero in
 *    your callback
 *
 *  - One class can have 'n' timers for different purpose, without worrying about managing timer. You should have different
 *    callbacks in such cases
 */
export declare class Timer {
    private subscriptions;
    private cbTimer;
    private currentTimer;
    private nextTs;
    private logging;
    constructor();
    register(name: string, cb: () => number): TimerInstance;
    /**
     * Subscribe to timer
     * @param cb Callback
     * @param ms milli-seconds to tick after
     * @param overwrite Overwrite the old subscription with this one. Read main comment
     */
    _tickAfter(sub: TimerInstance, ms: number, overwrite?: boolean): void;
    /**
     * Removes timer subscription. Read main comments to understand usage of this
     * @param cb
     */
    _remove(sub: TimerInstance): void;
    private timerEvent;
}
