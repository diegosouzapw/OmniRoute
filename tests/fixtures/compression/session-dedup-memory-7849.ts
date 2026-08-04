import { applyStackedCompression } from "../../../open-sse/services/compression/index.ts";

const lines = Array.from({ length: 4_000 }, (_, index) => {
  const prefix = `line-${index.toString().padStart(4, "0")}:`;
  return prefix + "x".repeat(80 - prefix.length);
});
const body = {
  messages: [{ role: "tool", content: lines.join("\n") }],
};
const enginesRun: string[] = [];
const result = applyStackedCompression(
  body,
  [
    { engine: "session-dedup" },
    { engine: "lite" },
    { engine: "rtk" },
    { engine: "headroom" },
    { engine: "caveman" },
  ],
  {
    onEngineStep: (step) => {
      enginesRun.push(step.engine);
    },
  }
);

process.stdout.write(
  JSON.stringify({
    enginesRun,
    warnings: result.stats?.validationWarnings ?? [],
  })
);
