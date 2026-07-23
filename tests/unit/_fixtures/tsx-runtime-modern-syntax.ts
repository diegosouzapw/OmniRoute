/**
 * #5757 guard fixture — NOT a test file (no `.test.` in the name, so the runner
 * skips it). Exercised by `tests/unit/tsx-runtime-transform-5757.test.ts`.
 *
 * It concentrates the modern JS/TS syntax that the published CLI's runtime
 * `tsx/esm` loader (`bin/omniroute.mjs` → `await import("tsx/esm")`) must
 * transform through esbuild at startup: object/array destructuring + rest,
 * object/array spread, class + private fields, optional chaining, nullish
 * coalescing, logical assignment, async/await and top-level await.
 *
 * If a future esbuild (pulled transitively via `tsx`) cannot transform this on a
 * supported Node runtime, running this file fails — which is the whole point.
 */
class Box {
  value = 41; // public class field
  #secret = 1; // private field

  bump(): number {
    this.value += this.#secret;
    return this.value;
  }
}

async function main() {
  const { a, b, ...rest } = { a: 1, b: 2, c: 3, d: 4 }; // object destructuring + rest
  const [first, ...tail] = [10, 20, 30]; // array destructuring + rest
  const merged = { ...rest, first }; // object spread
  const arr = [...tail, first]; // array spread
  const bumped = new Box().bump(); // class + private field
  const maybe: { x?: { y?: number } } = {};
  const opt = maybe?.x?.y ?? 99; // optional chaining + nullish coalescing
  let acc = 0;
  acc ||= bumped; // logical assignment
  const total = await Promise.resolve(a + b + first + opt + acc); // async/await
  return { a, b, rest, first, tail, merged, arr, bumped, opt, total };
}

const result = await main(); // top-level await
console.log("TSX_TRANSFORM_OK " + JSON.stringify(result));
