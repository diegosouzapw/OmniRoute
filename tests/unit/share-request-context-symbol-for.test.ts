import test from "node:test";
import assert from "node:assert/strict";

// Two module copies share the request contexts: a read from copy A must see the
// context opened by copy B. This mirrors production, where the module is bundled
// once per server chunk, so middleware opening the context and the route reading
// it may run on different copies. Single-copy coverage alone cannot catch this:
// it passes before and after.

const CORRELATION_PATH = "../../src/shared/middleware/correlationId.ts";
const REQUEST_ID_PATH = "../../src/shared/utils/requestId.ts";

test("a read from copy A sees the correlation opened by copy B", async () => {
  const copyA = await import(`${CORRELATION_PATH}?graph=a`);
  const copyB = await import(`${CORRELATION_PATH}?graph=b`);
  const id = "corr-shared-1";
  const seen = copyB.runWithCorrelation(id, () => copyA.getCorrelationId());
  assert.equal(seen, id);
});

test("a read from copy A sees the request id opened by copy B", async () => {
  const copyA = await import(`${REQUEST_ID_PATH}?graph=a`);
  const copyB = await import(`${REQUEST_ID_PATH}?graph=b`);
  const id = "req-shared-1";
  const seen = await copyB.withRequestId({ headers: { get: () => id } }, () =>
    copyA.getRequestId()
  );
  assert.equal(seen, id);
});

test("sequential contexts keep their own id, outside yields the empty value", async () => {
  const corrA = await import(`${CORRELATION_PATH}?graph=c`);
  const corrB = await import(`${CORRELATION_PATH}?graph=d`);
  assert.equal(
    corrB.runWithCorrelation("corr-first", () => corrA.getCorrelationId()),
    "corr-first"
  );
  assert.equal(
    corrB.runWithCorrelation("corr-second", () => corrA.getCorrelationId()),
    "corr-second"
  );
  assert.equal(corrA.getCorrelationId(), undefined);

  const reqA = await import(`${REQUEST_ID_PATH}?graph=c`);
  const reqB = await import(`${REQUEST_ID_PATH}?graph=d`);
  const first = await reqB.withRequestId({ headers: { get: () => "req-first" } }, () =>
    reqA.getRequestId()
  );
  assert.equal(first, "req-first");
  const second = await reqB.withRequestId({ headers: { get: () => "req-second" } }, () =>
    reqA.getRequestId()
  );
  assert.equal(second, "req-second");
  assert.equal(reqA.getRequestId(), null);
});
