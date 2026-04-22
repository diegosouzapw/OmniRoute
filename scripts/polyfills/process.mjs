// Polyfill for process module in environments where it's not available
// This is needed for pino-abstract-transport and readable-stream

export default globalThis.process;
export const process = globalThis.process;
