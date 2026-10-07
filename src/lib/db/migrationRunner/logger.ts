const isNodeTestRunnerChild = typeof process.env.NODE_TEST_CONTEXT === "string";

export const migrationConsole = {
  log: (...args: unknown[]) => {
    if (!isNodeTestRunnerChild) globalThis.console.log(...args);
  },
  warn: (...args: unknown[]) => {
    if (!isNodeTestRunnerChild) globalThis.console.warn(...args);
  },
  error: (...args: unknown[]) => {
    globalThis.console.error(...args);
  },
};
