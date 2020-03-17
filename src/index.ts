import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';

interface Abortable {
  abort: (reason?: string) => void;
}

interface ExecutorFunction<T> {
  (resolve: (value?: PromiseLike<T> | T) => void, reject: (reason?: any) => void): void;
}

interface AbortableExecutorFunction<T> {
  (resolve: (value?: PromiseLike<T> | T) => void, reject: (reason?: any) => void, abortSignal: AbortSignal): void;
}

export class AbortablePromise<T> extends Promise<T> implements Abortable {
  public abort: Abortable['abort'];

  constructor(executor: AbortableExecutorFunction<T>) {
    const abortController = new AbortController();
    const abortSignal = abortController.signal;

    let abortReason: string;
    const normalExecutor: ExecutorFunction<T> = (resolve, reject) => {
      abortSignal.addEventListener('abort', () => {
        reject(new AbortError(abortReason));
      });

      executor(resolve, reject, abortSignal);
    };

    super(normalExecutor);
    this.abort = reason => {
      if (reason) {
        abortReason = reason;
      }
      abortController.abort();
    };
  }

  static from = <T>(promise: Promise<T>): AbortablePromise<T> => {
    return new AbortablePromise<T>((resolve, reject) => {
      promise.then(resolve).catch(reject);
    });
  };
}

export class AbortError extends Error {
  constructor(message: string = 'Aborted') {
    super(message);
    this.name = 'AbortError';
  }
}
