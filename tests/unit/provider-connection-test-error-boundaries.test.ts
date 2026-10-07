import test from "node:test";

import { runIsolatedBoundaryFixture } from "./helpers/runIsolatedBoundaryFixture.ts";

test("provider connection error boundaries pass in an isolated child process", () => {
  runIsolatedBoundaryFixture({
    fixtureUrl: new URL(
      "./fixtures/provider-connection-test-error-boundaries.fixture.ts",
      import.meta.url
    ),
    expectedTests: 3,
    label: "provider connection error boundaries",
  });
});
