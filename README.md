# simple-abortable-promise [![Build Status](https://travis-ci.com/zzdjk6/simple-abortable-promise.svg?branch=master)](https://travis-ci.com/zzdjk6/simple-abortable-promise) [![Coverage Status](https://coveralls.io/repos/github/zzdjk6/simple-abortable-promise/badge.svg)](https://coveralls.io/github/zzdjk6/simple-abortable-promise)

A Simple Implementation of Abortable Promise

## How to install?

```bash
npm install simple-abortable-promise
```

## How to use?

### Creating

There are 2 ways to create an `AbortablePromise`:

#### Constructor

```typescript
const abortablePromise = new AbortablePromise<T>((resolve, resolve, abortSignal) => {
   // ...
});
```

#### Create from a promise

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
