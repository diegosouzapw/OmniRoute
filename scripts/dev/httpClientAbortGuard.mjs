"use strict";

/**
 * Re-export of the shared client-abort guard so the Node-only dev server
 * (`run-next.mjs`) keeps importing from its original relative path. The real
 * implementation lives in `src/shared/utils/httpClientAbortGuard.mjs` (importable
 * from both `.mjs` and the TypeScript servers under `src/`, tsconfig allowJs).
 *
 * @module
 */

export {
  isClientAbortError,
  isRecoverableUpstreamTimeoutError,
  shouldSwallowUncaught,
  attachRequestStreamGuards,
  installProcessCrashGuard,
} from "../../src/shared/utils/httpClientAbortGuard.mjs";
