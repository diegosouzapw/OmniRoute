// @vitest-environment jsdom
// tests/unit/ui/ionizerLane.test.tsx
import { describe, it, expect } from "vitest";
import { LANE_ENGINES } from "@/app/(dashboard)/dashboard/compression/studio/PlaygroundInput";
describe("studio lane engines", () => {
  it("includes the ionizer engine so it has its own playground lane", () => {
    expect(LANE_ENGINES).toContain("ionizer");
  });
});
