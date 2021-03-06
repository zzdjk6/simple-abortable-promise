import { AbortablePromise, AbortError } from '../index';

describe('AbortablePromise', () => {
  it('is a promise', async () => {
    expect.assertions(1);
    const abortablePromise = new AbortablePromise<number>((resolve) => {
      setTimeout(() => resolve(100), 100);
    });
    expect(abortablePromise).toBeInstanceOf(Promise);
    await abortablePromise;
  });

  it('can abort', async () => {
    expect.assertions(5);
    const abortablePromise = new AbortablePromise<number>((resolve) => {
      setTimeout(() => resolve(500), 500);
    });

    setTimeout(() => abortablePromise.abort(), 200);

    expect(abortablePromise.abortReason).toBeUndefined();

    try {
      await abortablePromise;
    } catch (e) {
      expect(e).toBeInstanceOf(AbortError);
      expect(e.name).toEqual('AbortError');
      expect(e.message).toEqual('Aborted');
    } finally {
      expect(abortablePromise.abortReason).toEqual('Aborted');
    }
  });

  it('can abort with reason', async () => {
    expect.assertions(5);
    const abortablePromise = new AbortablePromise<number>((resolve) => {
      setTimeout(() => resolve(500), 500);
    });

    setTimeout(() => abortablePromise.abort('I abort it'), 200);

    expect(abortablePromise.abortReason).toBeUndefined();

    try {
      await abortablePromise;
    } catch (e) {
      expect(e).toBeInstanceOf(AbortError);
      expect(e.name).toEqual('AbortError');
      expect(e.message).toEqual('I abort it');
    } finally {
      expect(abortablePromise.abortReason).toEqual('I abort it');
    }
  });

  it('can do something more when abort', async () => {
    expect.assertions(3);

    const mockFn1 = jest.fn();
    const mockFn2 = jest.fn();

    const abortablePromise = new AbortablePromise<number>((resolve, _, abortSignal) => {
      setTimeout(() => resolve(500), 500);
      abortSignal.onabort = () => {
        mockFn1();
      };
      abortSignal.addEventListener('abort', () => {
        mockFn2();
      });
    });

    setTimeout(() => abortablePromise.abort(), 200);

    try {
      await abortablePromise;
    } catch (e) {
      expect(e).toBeInstanceOf(AbortError);
    }

    expect(mockFn1).toBeCalledTimes(1);
    expect(mockFn2).toBeCalledTimes(1);
  });

  it('can be created from existing promise', async () => {
    expect.assertions(4);
    const promise = new Promise<number>((resolve) => {
      setTimeout(() => resolve(500), 500);
    });
    const abortablePromise = AbortablePromise.from(promise);
    const anotherAbortablePromise = AbortablePromise.from(abortablePromise);
    expect(anotherAbortablePromise).toBe(abortablePromise);

    setTimeout(() => abortablePromise.abort('I abort it'), 200);

    try {
      await abortablePromise;
    } catch (e) {
      expect(e).toBeInstanceOf(AbortError);
      expect(e.name).toEqual('AbortError');
      expect(e.message).toEqual('I abort it');
    }
  });
});

describe('AbortError', () => {
  it('construct with default message', () => {
    const error = new AbortError();
    expect(error.name).toEqual('AbortError');
    expect(error.message).toEqual('Aborted');
  });

  it('construct with custom message', () => {
    const error = new AbortError('I abort it');
    expect(error.name).toEqual('AbortError');
    expect(error.message).toEqual('I abort it');
  });
});
