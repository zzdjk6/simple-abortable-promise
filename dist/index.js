"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("abortcontroller-polyfill/dist/abortcontroller-polyfill-only");
class AbortablePromise extends Promise {
    constructor(executor) {
        const abortController = new AbortController();
        const abortSignal = abortController.signal;
        const normalExecutor = (resolve, reject) => {
            abortSignal.addEventListener('abort', () => {
                reject(new AbortError(this.abortReason));
            });
            executor(resolve, reject, abortSignal);
        };
        super(normalExecutor);
        this.abort = reason => {
            this._abortReason = reason ? reason : 'Aborted';
            abortController.abort();
        };
    }
    get abortReason() {
        return this._abortReason;
    }
}
exports.AbortablePromise = AbortablePromise;
AbortablePromise.from = (promise) => {
    return new AbortablePromise((resolve, reject) => {
        promise.then(resolve).catch(reject);
    });
};
class AbortError extends Error {
    constructor(message = 'Aborted') {
        super(message);
        this.name = 'AbortError';
    }
}
exports.AbortError = AbortError;
//# sourceMappingURL=index.js.map