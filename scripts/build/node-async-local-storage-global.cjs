"use strict";

if (typeof globalThis.AsyncLocalStorage === "undefined") {
  const { AsyncLocalStorage } = require("node:async_hooks");
  globalThis.AsyncLocalStorage = AsyncLocalStorage;
}
