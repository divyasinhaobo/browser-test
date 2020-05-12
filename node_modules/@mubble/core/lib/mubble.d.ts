export declare namespace Mubble {
    type uObject<T> = Object & {
        [name: string]: T;
    };
    type uChildObject<T> = {
        [name in keyof T]?: T[name];
    };
    const Lang: {
        English: string;
        Hindi: string;
        Kannada: string;
    };
    class uError extends Error {
        code: string;
        constructor(code: string, msg: string);
    }
    class uPromise<T> {
        static execFn(fn: Function, context: Object | null, ...params: any[]): Promise<any>;
        static delayedPromise<X>(ms: number, fulfillWith?: X): Promise<X>;
        private static getFn;
        private fnResolve;
        private fnReject;
        private fulfilled;
        readonly promise: Promise<T>;
        constructor();
        execute(cb: (promise: uPromise<T>) => void): uPromise<T>;
        resolve(result: T): void;
        reject(err: Error): void;
        isFulfilled(): boolean;
        private cleanup;
    }
}
