import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const dockerGuide = readFileSync(
  new URL("../../docs/guides/DOCKER_GUIDE.md", import.meta.url),
  "utf8"
);
const envDoc = readFileSync(
  new URL("../../docs/reference/ENVIRONMENT.md", import.meta.url),
  "utf8"
);

test("DOCKER_GUIDE documents N independent DATA_DIRs as the large-job scale-out (#11024)", () => {
  assert.match(dockerGuide, /## Scale-out: N independent processes/);
  assert.match(dockerGuide, /DATA_DIR/);
  assert.match(dockerGuide, /replicas > 1/);
  assert.match(dockerGuide, /QUOTA_STORE_DRIVER=redis/);
  assert.match(dockerGuide, /#8075/);
  assert.doesNotMatch(
    dockerGuide,
    /deploy:\s*\n\s*replicas:\s*2/,
    "must not show replicas: 2 as the scale-out recipe"
  );
});

test("ENVIRONMENT.md points CHAT_MAX_HEAVY_IN_FLIGHT at per-process V8, not host RAM (#11024)", () => {
  const row = envDoc
    .split("\n")
    .find((line) => line.includes("`OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`"));
  assert.ok(row);
  assert.match(row, /one process|per process|V8/i);
  assert.match(row, /DATA_DIR|#11024/);
});

test("DOCKER_GUIDE documents the one-process long /v1/responses recipe (healthy-headroom, not max 2)", () => {
  assert.match(dockerGuide, /One-process: more than two long/);
  assert.match(dockerGuide, /tryAcquireHealthyHeadroom/);
  assert.match(dockerGuide, /OMNIROUTE_CHAT_LARGE_BODY_BYTES/);
  assert.match(dockerGuide, /40–50|40-50/);
  assert.match(dockerGuide, /memory-budget/);
  assert.match(dockerGuide, /#10110|#10437/);
  assert.match(dockerGuide, /replicas > 1/);
});

test("ENVIRONMENT.md documents LARGE_BODY_BYTES healthy-headroom and no hard max-2", () => {
  const large = envDoc
    .split("\n")
    .find((line) => line.startsWith("| `OMNIROUTE_CHAT_LARGE_BODY_BYTES`"));
  const heavy = envDoc
    .split("\n")
    .find((line) => line.startsWith("| `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`"));
  const headroom = envDoc
    .split("\n")
    .find((line) => line.startsWith("| `OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`"));
  assert.ok(large);
  assert.ok(heavy);
  assert.ok(headroom);
  assert.match(large, /healthy-headroom|#10437/);
  assert.match(large, /#10110|#7849/);
  assert.match(heavy, /memory-budget|not a hard product max|not a hard “max 2”/i);
  assert.match(headroom, /BYTE|admitChatRequest/);
});
