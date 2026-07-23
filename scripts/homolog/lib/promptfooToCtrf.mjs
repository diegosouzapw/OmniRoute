export function promptfooToCtrf(output) {
  const rows = output?.results?.results || [];
  const tests = rows.map((r) => ({
    name: `provider-smoke: ${r.provider?.label || r.provider?.id || "?"}`,
    status: r.success ? "passed" : "failed",
    duration: Math.round(r.latencyMs || 0),
    ...(r.error ? { message: String(r.error).slice(0, 300) } : {}),
  }));
  const passed = tests.filter((t) => t.status === "passed").length;
  return {
    results: {
      tool: { name: "promptfoo" },
      summary: {
        tests: tests.length,
        passed,
        failed: tests.length - passed,
        pending: 0,
        skipped: 0,
        other: 0,
      },
      tests,
    },
  };
}
