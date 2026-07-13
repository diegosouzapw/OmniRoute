import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { PreviewRequestSchema } from "../../src/app/api/compression/preview/route.ts";
import { normalizeStackedPipeline } from "../../src/lib/db/compression.ts";

// omniglyph is a valid CompressionMode + registered engine (ENGINE_CATALOG /
// STACKED_PIPELINE_ENGINE_IDS / stackedPipelineStepSchema all include it), but two
// engine-registration allowlists silently dropped it:
//   A) compressionCombos.KNOWN_ENGINE_IDS omitted it, so normalizePipeline stripped an
//      { engine: "omniglyph" } step on every combo read (getCompressionCombo / list).
//   B) the preview route's mode enum omitted it, so POST /api/compression/preview with
//      { mode: "omniglyph" } returned 400 even though settings.defaultMode accepts it.
// These tests pin both contracts.

const TEST_DATA_DIR = fs.mkdtempSync(
	path.join(os.tmpdir(), "omniroute-omniglyph-reg-"),
);
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

// Imported after DATA_DIR is set so the DB singleton opens under the temp dir.
const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/compressionCombos.ts");

async function resetStorage() {
	core.resetDbInstance();
	fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
	fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
	await resetStorage();
});

test.after(() => {
	// Release the SQLite handle — an open handle hangs the node native test runner.
	core.resetDbInstance();
	fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
	if (ORIGINAL_DATA_DIR === undefined) {
		delete process.env.DATA_DIR;
	} else {
		process.env.DATA_DIR = ORIGINAL_DATA_DIR;
	}
});

// --- Defect A: combo read preserves an omniglyph pipeline step -----------------------

test("A: getCompressionCombo preserves an omniglyph pipeline step (not stripped)", () => {
	const combo = combosDb.createCompressionCombo({
		name: "Omniglyph pipeline",
		pipeline: [
			{ engine: "rtk", intensity: "standard" },
			{ engine: "omniglyph" },
		],
	});

	// Read back through the public path (rowToCompressionCombo → normalizePipeline).
	const read = combosDb.getCompressionCombo(combo.id);
	assert.ok(read, "combo should be readable");
	assert.deepEqual(
		read.pipeline.map((step) => step.engine),
		["rtk", "omniglyph"],
		"the omniglyph step must survive normalizePipeline on read",
	);
});

test("A: listCompressionCombos also preserves the omniglyph step", () => {
	const combo = combosDb.createCompressionCombo({
		name: "Omniglyph only",
		pipeline: [{ engine: "omniglyph" }],
	});

	const listed = combosDb
		.listCompressionCombos()
		.find((c) => c.id === combo.id);
	assert.ok(listed, "created combo should be listed");
	assert.deepEqual(
		listed.pipeline.map((step) => step.engine),
		["omniglyph"],
		"a single omniglyph step must not be dropped",
	);
});

test("A: omniglyph stays consistent across the combo + stacked-pipeline allowlists", () => {
	// KNOWN_ENGINE_IDS (compressionCombos) and STACKED_PIPELINE_ENGINE_IDS (compression)
	// must agree that omniglyph is a known engine — otherwise one path accepts a step the
	// other silently strips (#6747 B-PIPELINE-DIVERGENCE). Assert via the public read paths.
	const combo = combosDb.createCompressionCombo({
		name: "Consistency",
		pipeline: [{ engine: "omniglyph" }],
	});
	const comboKeepsOmniglyph = combosDb
		.getCompressionCombo(combo.id)
		?.pipeline.some((step) => step.engine === "omniglyph");

	const stackedKeepsOmniglyph = normalizeStackedPipeline([
		{ engine: "omniglyph" },
	]).some((step) => step.engine === "omniglyph");

	assert.equal(comboKeepsOmniglyph, true, "combo path must keep omniglyph");
	assert.equal(
		stackedKeepsOmniglyph,
		true,
		"stacked-pipeline path must keep omniglyph",
	);
});

// --- Defect B: preview route accepts mode: "omniglyph" -------------------------------

test("B: PreviewRequestSchema accepts mode: omniglyph", () => {
	const parsed = PreviewRequestSchema.safeParse({
		messages: [{ role: "user", content: "hi" }],
		mode: "omniglyph",
	});
	assert.equal(
		parsed.success,
		true,
		"mode: omniglyph must be a valid preview mode",
	);
});

test("B: PreviewRequestSchema still rejects an unknown mode", () => {
	const parsed = PreviewRequestSchema.safeParse({
		messages: [{ role: "user", content: "hi" }],
		mode: "not-a-real-mode",
	});
	assert.equal(parsed.success, false, "an unknown mode must still be rejected");
});
