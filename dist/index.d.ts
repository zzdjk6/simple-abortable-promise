import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';
interface Abortable {
    abort: (reason: string) => void;
}
interface AbortableExecutorFunction<T> {
    (resolve: (value?: PromiseLike<T> | T) => void, reject: (reason?: any) => void, abortSignal: AbortSignal): void;
}
export declare class AbortablePromise<T> extends Promise<T> implements Abortable {
    abort: Abortable['abort'];
    constructor(executor: AbortableExecutorFunction<T>);
    static from: <T_1>(promise: Promise<T_1>) => AbortablePromise<T_1>;
}
export declare class AbortError extends Error {
    constructor(message?: string);
}
export {};
