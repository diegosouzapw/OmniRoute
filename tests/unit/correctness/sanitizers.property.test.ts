import test from "node:test";
import assert from "node:assert/strict";
import fc from "fast-check";
import { configureProperties } from "../../helpers/propertyConfig.ts";
import { sanitizeErrorMessage } from "../../../open-sse/utils/error.ts";

configureProperties();

test("sanitizeErrorMessage never leaks a file path / stack frame", () => {
  // sanitizeErrorMessage takes only the FIRST LINE of input (observed real behavior:
  // it splits on \n and processes only the part before the first newline).
  // Stack frames are on subsequent lines and thus already stripped.
  // The invariant we test: single-line content containing "at /path/file.ts" has the
  // absolute path replaced with "<path>", so the output never contains "at /".
  const firstLineWithPath = fc
    .string()
    .map((s) => s.replace(/\n/g, " ")) // ensure single line
    .chain((prefix) =>
      fc
        .string()
        .map((s) => s.replace(/\n/g, " "))
        .map((suffix) => `${prefix} at /home/app/open-sse/foo.ts:42:10 ${suffix}`)
    );

  fc.assert(
    fc.property(firstLineWithPath, (input) => {
      const out = sanitizeErrorMessage(input);
      assert.ok(!out.includes("at /"), `leaked path in: ${JSON.stringify(out)}`);
    })
  );
});

// This guards against ALGORITHMIC (super-linear/exponential) blowup on adversarial
// content — e.g. catastrophic regex backtracking — not raw throughput. Sanitization
// has a fixed per-call cost (layered redact/normalize passes over a bounded, truncated
// buffer) that does not scale with input length past the truncation point, so a tight
// absolute wall-clock bound is inherently flaky under CI/machine load (it has no margin
// over that fixed cost, and the same load inflates every measurement here uniformly).
// Instead we assert the cost does NOT blow up with input size: a baseline taken on a
// small input is compared, with a generous multiplicative+additive allowance for
// scheduler/GC noise, against inputs from 1,000 to 20,000 chars. A real ReDoS
// (superlinear/exponential backtracking) grows orders of magnitude faster than this
// allowance regardless of machine load; ordinary fixed-cost regex work never gets close.
function timeSanitize(input: string): number {
  const start = process.hrtime.bigint();
  sanitizeErrorMessage(input);
  return Number(process.hrtime.bigint() - start) / 1e6;
}

function buildAdversarialInput(len: number): string {
  return "a".repeat(len) + "@" + "b".repeat(len) + ".com " + "1".repeat(len);
}

function medianOf(samples: number[]): number {
  const sorted = [...samples].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

test("sanitizeErrorMessage cost does not scale with adversarial input size (ReDoS guard)", () => {
  // Warm up the JIT before measuring so the baseline isn't inflated by cold-start cost.
  for (let i = 0; i < 3; i += 1) timeSanitize(buildAdversarialInput(300));
  // Baseline: median of several small-input runs, well under any truncation boundary.
  const baselineMs = Math.max(
    medianOf([1, 2, 3].map(() => timeSanitize(buildAdversarialInput(300)))),
    1
  );
  // Coarse absolute backstop only — "did it hang forever" — never the primary assertion.
  const HANG_CEILING_MS = 5000;
  // Generous allowance for scheduler/GC noise under a loaded CI machine — calibrated well
  // above observed variance (baseline vs. worst-case adversarial run stayed under ~30x
  // even on a heavily loaded box) so only genuine algorithmic blowup can trip it.
  const NOISE_TOLERANT_CEILING_MS = baselineMs * 100 + 1000;

  fc.assert(
    fc.property(fc.integer({ min: 1000, max: 20000 }), (len) => {
      const ms = timeSanitize(buildAdversarialInput(len));
      assert.ok(ms < HANG_CEILING_MS, `hung: ${ms}ms for len=${len}`);
      assert.ok(
        ms < NOISE_TOLERANT_CEILING_MS,
        `cost scaled with input length (possible backtracking): ${ms}ms for len=${len} vs baseline ${baselineMs}ms`
      );
    })
  );
});
