import { AbortablePromise, AbortError } from '../index';

describe('AbortablePromise', () => {
  it('is a promise', async () => {
    expect.assertions(1);
    const abortablePromise = new AbortablePromise<number>(resolve => {
      setTimeout(() => resolve(100), 100);
    });
    expect(abortablePromise).toBeInstanceOf(Promise);
    await abortablePromise;
  });

  it('can abort', async () => {
    expect.assertions(3);
    const abortablePromise = new AbortablePromise<number>(resolve => {
      setTimeout(() => resolve(500), 500);
    });

    setTimeout(() => abortablePromise.abort(), 200);

    try {
      await abortablePromise;
    } catch (e) {
      expect(e).toBeInstanceOf(AbortError);
      expect(e.name).toEqual('AbortError');
      expect(e.message).toEqual('Aborted');
    }
  });

  it('can abort with reason', async () => {
    expect.assertions(3);
    const abortablePromise = new AbortablePromise<number>(resolve => {
      setTimeout(() => resolve(500), 500);
    });

    setTimeout(() => abortablePromise.abort('I abort it'), 200);

    try {
      await abortablePromise;
    } catch (e) {
      expect(e).toBeInstanceOf(AbortError);
      expect(e.name).toEqual('AbortError');
      expect(e.message).toEqual('I abort it');
    }
  });

  it('can be created from existing promise', async () => {
    expect.assertions(3);
    const promise = new Promise<number>(resolve => {
      setTimeout(() => resolve(500), 500);
    });
    const abortablePromise = AbortablePromise.from(promise);
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
