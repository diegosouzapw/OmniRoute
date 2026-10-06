import { describe, expect, it } from "vitest";

import { getLobeProviderIcon } from "@/shared/components/lobeProviderIcons";

describe("AnySearch provider icon fallback", () => {
  it.each(["anysearch", "anysearch-search"])(
    "falls through when LobeHub has no icon for %s",
    (providerId) => {
      expect(getLobeProviderIcon(providerId)).toBeNull();
    }
  );
});
