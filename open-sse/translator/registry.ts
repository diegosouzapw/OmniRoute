type RequestTranslator = (
  model: string,
  body: Record<string, unknown>,
  stream?: boolean,
  credentials?: Record<string, unknown> | null
) => unknown;

type ResponseTranslator = (
  chunk: Record<string, unknown>,
  state: Record<string, unknown>
) => unknown;

const requestRegistry = new Map<string, RequestTranslator>();
const responseRegistry = new Map<string, ResponseTranslator>();

function makeKey(from: string, to: string) {
  return `${from}:${to}`;
}

export function register(
  from: string,
  to: string,
  requestFn?: RequestTranslator,
  responseFn?: ResponseTranslator
) {
  const key = makeKey(from, to);
  if (requestFn) {
    requestRegistry.set(key, requestFn);
  }
  if (responseFn) {
    responseRegistry.set(key, responseFn);
  }
}

export function getRequestTranslator(from: string, to: string) {
  return requestRegistry.get(makeKey(from, to));
}

export function getResponseTranslator(from: string, to: string) {
  return responseRegistry.get(makeKey(from, to));
}
