import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';
export interface Abortable {
    abort: (reason?: string) => void;
    readonly abortReason?: string;
}
interface AbortableExecutorFunction<T> {
    (resolve: (value?: PromiseLike<T> | T) => void, reject: (reason?: any) => void, abortSignal: AbortSignal): void;
}
export declare class AbortablePromise<T> extends Promise<T> implements Abortable {
    abort: Abortable['abort'];
    get abortReason(): string | undefined;
    private _abortReason?;
    constructor(executor: AbortableExecutorFunction<T>);
    static from: <T_1>(promise: Promise<T_1>) => AbortablePromise<T_1>;
}
export declare class AbortError extends Error {
    constructor(message?: string);
}
export {};
