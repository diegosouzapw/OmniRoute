import ora from "ora";

export async function withSpinner(label, fn, opts = {}) {
  const enabled = shouldUseSpinner(opts);
  const spinner = enabled
    ? ora({ text: label, stream: process.stderr }).start()
    : { succeed: () => {}, fail: () => {}, info: () => {}, text: "", stop: () => {} };

  try {
    const result = await fn({
      update: (text) => {
        spinner.text = text;
      },
    });
    if (enabled) spinner.succeed(label);
    return result;
  } catch (err) {
    if (enabled) spinner.fail(`${label} — ${err.message}`);
    throw err;
  }
}

export function shouldUseSpinner(opts = {}) {
  if (opts.quiet) return false;
  if (opts.output === "json" || opts.output === "jsonl" || opts.output === "csv") return false;
  if (!process.stderr.isTTY) return false;
  if (process.env.NO_COLOR) return false;
  if (process.env.CI) return false;
  return true;
}
