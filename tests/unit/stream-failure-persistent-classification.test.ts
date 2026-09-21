import test from "node:test";

import { runIsolatedBoundaryFixture } from "./helpers/runIsolatedBoundaryFixture.ts";

test("stream failure persistence boundaries pass in an isolated child process", () => {
  runIsolatedBoundaryFixture({
    fixtureUrl: new URL(
      "./fixtures/stream-failure-persistent-classification.fixture.ts",
      import.meta.url
    ),
    expectedTests: 2,
    label: "stream failure persistence boundaries",
  });
});
