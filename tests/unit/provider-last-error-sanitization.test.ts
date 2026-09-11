import test from "node:test";

import { runIsolatedBoundaryFixture } from "./helpers/runIsolatedBoundaryFixture.ts";

test("provider last-error persistence passes in an isolated child process", () => {
  runIsolatedBoundaryFixture({
    fixtureUrl: new URL("./fixtures/provider-last-error-sanitization.fixture.ts", import.meta.url),
    expectedTests: 1,
    label: "provider last-error persistence",
  });
});
