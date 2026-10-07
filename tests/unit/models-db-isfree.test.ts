import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  addCustomModel,
  replaceCustomModels,
  updateCustomModel,
  getCustomModels,
} from "../../src/lib/db/models.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import { rmSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

type CustomRow = { id: string; isFree?: boolean };

describe("custom isFree tri-state (DB)", () => {
  let dir: string;
  let prevDataDir: string | undefined;
  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "omni-isfree-"));
    prevDataDir = process.env.DATA_DIR;
    process.env.DATA_DIR = dir;
    // force DB to re-create in this DATA_DIR
    resetDbInstance();
  });
  afterEach(() => {
    resetDbInstance();
    if (prevDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = prevDataDir;
    try {
      rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    } catch {}
  });

  it("addCustomModel round-trip isFree:true → kept, isFree absent → not set", async () => {
    await addCustomModel(
      "p",
      "m1",
      "M1",
      "manual",
      "chat-completions",
      ["chat"],
      undefined,
      {},
      undefined,
      undefined,
      true
    );
    const rows = (await getCustomModels("p")) as CustomRow[];
    const r = rows.find((x) => x.id === "m1");
    assert.equal(r.isFree, true);
    await addCustomModel(
      "p",
      "m2",
      "M2",
      "manual",
      "chat-completions",
      ["chat"],
      undefined,
      {},
      undefined,
      undefined,
      undefined
    );
    const rows2 = (await getCustomModels("p")) as CustomRow[];
    const r2 = rows2.find((x) => x.id === "m2");
    assert.equal(r2.isFree, undefined);
  });

  it("updateCustomModel isFree:null → delete key (tri-state clear)", async () => {
    await addCustomModel(
      "p",
      "m",
      "M",
      "manual",
      "chat-completions",
      ["chat"],
      undefined,
      {},
      undefined,
      undefined,
      true
    );
    await updateCustomModel("p", "m", { isFree: null });
    const rows = (await getCustomModels("p")) as CustomRow[];
    const r = rows.find((x) => x.id === "m");
    assert.equal(r.isFree, undefined);
  });

  it("updateCustomModel isFree:true → set, then false-effective via tri-state (Boolean) ", async () => {
    await addCustomModel(
      "p",
      "m",
      "M",
      "manual",
      "chat-completions",
      ["chat"],
      undefined,
      {},
      undefined,
      undefined,
      undefined
    );
    await updateCustomModel("p", "m", { isFree: true });
    let rows = (await getCustomModels("p")) as CustomRow[];
    assert.equal(rows.find((x) => x.id === "m").isFree, true);
    // tri-state helper treats false as Boolean(false) → stored as false (falsy free), but only true is free per isFree guard
    await updateCustomModel("p", "m", { isFree: false });
    rows = await getCustomModels("p");
    assert.equal(rows.find((x) => x.id === "m").isFree, false);
  });

  it("replaceCustomModels preserves isFree (new wins else prev)", async () => {
    await addCustomModel(
      "p",
      "keep",
      "K",
      "manual",
      "chat-completions",
      ["chat"],
      undefined,
      {},
      undefined,
      undefined,
      true
    );
    await addCustomModel(
      "p",
      "override",
      "O",
      "manual",
      "chat-completions",
      ["chat"],
      undefined,
      {},
      undefined,
      undefined,
      undefined
    );
    // replace with new truth for override, omit for keep (prev should win)
    await replaceCustomModels("p", [
      { id: "keep", name: "keep" },
      { id: "override", name: "override", isFree: true },
    ]);
    const rows = (await getCustomModels("p")) as CustomRow[];
    assert.equal(
      rows.find((x) => x.id === "keep").isFree,
      true,
      "prev isFree preserved when new omits"
    );
    assert.equal(rows.find((x) => x.id === "override").isFree, true, "new isFree wins");
  });

  it("allowEmpty:false intact (no destructive clear)", async () => {
    await addCustomModel(
      "p",
      "m",
      "M",
      "manual",
      "chat-completions",
      ["chat"],
      undefined,
      {},
      undefined,
      undefined,
      true
    );
    const before = (await getCustomModels("p")) as CustomRow[];
    const after = await replaceCustomModels("p", [], { allowEmpty: false });
    assert.equal(after.length, before.length);
  });
});
