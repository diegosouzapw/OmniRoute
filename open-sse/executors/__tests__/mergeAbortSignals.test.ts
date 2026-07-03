import { describe, it, expect } from "vitest";
import { mergeAbortSignals } from "../mergeAbortSignals";

describe("mergeAbortSignals", () => {
  it("returns an already-aborted composite signal when both are already aborted", () => {
    const a = new AbortController();
    const b = new AbortController();
    a.abort();
    b.abort();
    const merged = mergeAbortSignals(a.signal, b.signal);
    expect(merged).toBeDefined();
    expect(merged?.aborted).toBe(true);
  });

  it("returns a fresh composite signal when both inputs are fresh", () => {
    const a = new AbortController();
    const b = new AbortController();
    const merged = mergeAbortSignals(a.signal, b.signal);
    expect(merged).not.toBe(a.signal);
    expect(merged).not.toBe(b.signal);
    expect(merged.aborted).toBe(false);
  });

  it("propagates an abort from the first signal onto the merged controller", () => {
    const upstream = new AbortController();
    const downstream = new AbortController();
    const merged = mergeAbortSignals(upstream.signal, downstream.signal)!;
    expect(merged.aborted).toBe(false);
    upstream.abort();
    expect(merged.aborted).toBe(true);
    expect(merged.reason).toBe(upstream.signal.reason);
  });

  it("propagates an abort from the second signal onto the merged controller", () => {
    const upstream = new AbortController();
    const downstream = new AbortController();
    const merged = mergeAbortSignals(upstream.signal, downstream.signal)!;
    downstream.abort();
    expect(merged.aborted).toBe(true);
    expect(merged.reason).toBe(downstream.signal.reason);
  });

  it("the merged signal reflects whichever upstream aborts first", () => {
    const upstream = new AbortController();
    const downstream = new AbortController();
    const merged = mergeAbortSignals(upstream.signal, downstream.signal)!;
    upstream.abort(new Error("upstream aborted first"));
    expect(merged.aborted).toBe(true);
    expect((merged.reason as Error).message).toBe("upstream aborted first");
  });

  it("does not throw when one upstream signal fires twice", () => {
    const upstream = new AbortController();
    const downstream = new AbortController();
    const merged = mergeAbortSignals(upstream.signal, downstream.signal)!;
    upstream.abort(new Error("first"));
    // a second abort on the upstream is a no-op for the listener we registered
    upstream.abort(new Error("second"));
    expect(merged.aborted).toBe(true);
    expect((merged.reason as Error).message).toBe("first");
  });

  it("returns an aborted composite signal when one is already aborted", () => {
    const aborted = new AbortController();
    aborted.abort(new Error("pre-aborted"));
    const fresh = new AbortController();
    const merged = mergeAbortSignals(aborted.signal, fresh.signal);
    expect(merged).not.toBe(aborted.signal);
    expect(merged?.reason).toBeInstanceOf(Error);
  });
});
