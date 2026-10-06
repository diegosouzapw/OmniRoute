import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-mm-embed-alias-"));

const embeddings = await import("../../src/app/api/v1/embeddings/route.ts");
const multimodal = await import("../../src/app/api/v1/multimodal-embeddings/route.ts");

test("POST/GET/OPTIONS /v1/multimodal-embeddings are the embeddings handlers", () => {
  assert.equal(multimodal.POST, embeddings.POST);
  assert.equal(multimodal.GET, embeddings.GET);
  assert.equal(multimodal.OPTIONS, embeddings.OPTIONS);
});
