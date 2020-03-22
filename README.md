# simple-abortable-promise [![Build Status](https://travis-ci.com/zzdjk6/simple-abortable-promise.svg?branch=master)](https://travis-ci.com/zzdjk6/simple-abortable-promise) [![Coverage Status](https://coveralls.io/repos/github/zzdjk6/simple-abortable-promise/badge.svg)](https://coveralls.io/github/zzdjk6/simple-abortable-promise)

A Simple Implementation of Abortable Promise

## Overview

This library provides a deadly simple implementation of making `Promise` abortable.

That is, an `AbortablePromise` is a `Promise` with the abitlity to be aborted.

When an `AbortablePromise` is aborted, it will reject with an `AbortError`.

## How to install?

```bash
npm install simple-abortable-promise
```

## How to use?

### Creating

There are 2 ways to create an `AbortablePromise`:

#### Constructor

```typescript
const abortablePromise = new AbortablePromise<T>((resolve, reject, abortSignal) => {
  // ...
});
```

#### Create from an existing Promise

```typescript
const abortablePromise = AbortablePromise.from(promise);
```

### Abort

```typescript
// Abort with default reason - Aborted
abortablePromise.abort();

// Abort with custom reason
abortablePromise.abort('I abort it');
```

## Receipes

### Use with fetch

```typescript
const loadData = (id: number) => {
  retrun new AbortablePromise<Data>((resolve, reject, abortSignal) => {
    fetch(url, { signal: abortSignal })
      .then(response => response.json())
      .then(parseJsonToData)
      .then(resolve)
      .catch(reject);
  });
}

const abortablePromise = loadData(id);
abortablePromise.abort();
```

### Do something more when abort

```typescript
const abortablePromise = new AbortablePromise<Data>((resolve, reject, abortSignal) => {
  abortSignal.addEventListener('abort', () => {
    // Do something
  });
  // ...
});
```

## More

More background explain is available on my [blog](https://medium.com/@zzdjk6/a-simple-implementation-of-abortable-promise-using-abortcontroller-with-typescript-2c163ee050e8).
