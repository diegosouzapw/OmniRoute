import test from "node:test";

import { runIsolatedBoundaryFixture } from "./helpers/runIsolatedBoundaryFixture.ts";

test("public error boundaries pass in an isolated child process", () => {
  runIsolatedBoundaryFixture({
    fixtureUrl: new URL("./fixtures/error-public-boundaries-hardening.fixture.ts", import.meta.url),
    expectedTests: 23,
    label: "public error boundaries",
  });
});
