/**
 * The stable contract has no `ctx.catalog`: providers publish through
 * `ctx.provider.transform` (`editor.add` with `info` + `models`) and narrow
 * through `ctx.model.transform`. This guard therefore requires the provider
 * and model transforms plus an options object, and nothing else.
 */
export function assertContext(ctx: unknown): void {
  if (!isObject(ctx)) {
    throw new Error("[omniroute-v2] contract breach: ctx must be an object");
  }
  if (!isTransformHolder(ctx.provider) || typeof ctx.provider.transform !== "function") {
    throw new Error("[omniroute-v2] contract breach: ctx.provider.transform must be a function");
  }
  if (!isTransformHolder(ctx.model) || typeof ctx.model.transform !== "function") {
    throw new Error("[omniroute-v2] contract breach: ctx.model.transform must be a function");
  }
  if (!isObject(ctx.options)) {
    throw new Error("[omniroute-v2] contract breach: ctx.options must be an object");
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isTransformHolder(value: unknown): value is { transform: unknown } {
  return isObject(value) && "transform" in value;
}
