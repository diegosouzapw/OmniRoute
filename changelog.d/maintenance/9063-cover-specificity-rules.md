- **test(sse):** added the first test suite for `open-sse/services/specificityRules.ts` — the
  module was hotspot #7 in the coverage plan at 11.28% lines with no dedicated test; the 14 pure
  detectors are now pinned edge-to-edge (token ladders, per-domain max-not-sum scoring, and the
  min/max clamps), taking the file to ~100% line coverage. The suite also documents two quirks
  left unchanged: `detectReasoningDepth` scores above 0 on marker-free input via its
  always-applied message-depth bonus, and `detectErrorContext` returns non-integer scores because
  it never rounds ([#9063](https://github.com/diegosouzapw/OmniRoute/pull/9063))
