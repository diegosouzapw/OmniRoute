/**
 * Perfil semântico do OmniGlyph (pacote 1.4.0) — persistência ponta a ponta.
 *
 * Cobre:
 * 1. compressionSettingsUpdateSchema aceita omniglyph:{profile} e RECUSA nome inválido
 * 2. updateCompressionSettings / getCompressionSettings fazem round-trip do perfil
 * 3. o default persistido é `aggressive` (a política que os recibos mediram)
 * 4. um perfil desconhecido vindo do storage cai para o default, não vaza adiante
 */
import { describe, it, beforeEach, afterEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { compressionSettingsUpdateSchema } from "../../../src/shared/validation/compressionConfigSchemas.ts";
import { DEFAULT_OMNIGLYPH_CONFIG } from "../../../open-sse/services/compression/types.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-omniglyph-profile-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const { getCompressionSettings, updateCompressionSettings } =
  await import("../../../src/lib/db/compression.ts");

beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

afterEach(() => {
  core.resetDbInstance();
});

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

describe("omniglyph profile config", () => {
  it("o schema aceita os quatro perfis e recusa qualquer outro nome", () => {
    for (const profile of ["coding-safe", "balanced", "aggressive", "passthrough"]) {
      const parsed = compressionSettingsUpdateSchema.safeParse({ omniglyph: { profile } });
      assert.equal(parsed.success, true, `perfil válido recusado: ${profile}`);
    }
    // Um nome inválido tem de morrer no schema. Se passar, o adapter ainda falha
    // fechado (skip:invalid_profile), mas o operador veria a engine desligada
    // sem nenhum erro na tela de configuração.
    assert.equal(
      compressionSettingsUpdateSchema.safeParse({ omniglyph: { profile: "turbo-max" } }).success,
      false
    );
    assert.equal(
      compressionSettingsUpdateSchema.safeParse({ omniglyph: { profile: "" } }).success,
      false
    );
  });

  it("o default é aggressive — a política que os recibos publicados mediram", async () => {
    assert.equal(DEFAULT_OMNIGLYPH_CONFIG.profile, "aggressive");
    assert.equal((await getCompressionSettings()).omniglyph?.profile, "aggressive");
  });

  it("round-trip do perfil escolhido pelo operador", async () => {
    await updateCompressionSettings({ omniglyph: { profile: "coding-safe" } });
    assert.equal((await getCompressionSettings()).omniglyph?.profile, "coding-safe");

    await updateCompressionSettings({ omniglyph: { profile: "passthrough" } });
    assert.equal((await getCompressionSettings()).omniglyph?.profile, "passthrough");
  });

  it("perfil desconhecido no storage cai para o default em vez de vazar adiante", async () => {
    await updateCompressionSettings({ omniglyph: { profile: "coding-safe" } });
    // Simula uma linha gravada por uma versão futura/adulterada, contornando o schema.
    await updateCompressionSettings({ omniglyph: { profile: "turbo-max" } } as never);
    assert.equal((await getCompressionSettings()).omniglyph?.profile, "aggressive");
  });
});
