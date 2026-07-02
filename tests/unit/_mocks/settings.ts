/**
 * Shared settings test fixture.
 *
 * Backs onto a real isolated SQLite DB + the production
 * `updateSettings → applyRuntimeSettings` pipeline so callers exercise the
 * actual hot-reload path. Tests that need to mock `getAuthzBypassSnapshot`
 * directly defeat the integration value of AC-7 — use this helper instead.
 *
 * Usage:
 * ```ts
 * import { setupSettingsFixture, mockSettings, resetSettingsMock } from "../_mocks/settings";
 * const fixture = setupSettingsFixture("authz-bypass");
 * test.beforeEach(() => fixture.resetStorage());
 * await mockSettings({ localOnlyManageScopeBypassEnabled: false });
 * ```
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

type SettingsPatch = Record<string, unknown>;

let activeFixture: SettingsFixture | null = null;

export interface SettingsFixture {
  testDataDir: string;
  resetStorage(): Promise<void>;
  cleanup(): void;
}

/**
 * Allocate an isolated DATA_DIR + reset DB state per test. Must run BEFORE
 * any DB modules are imported by the test file.
 */
export function setupSettingsFixture(slug: string): SettingsFixture {
  const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), `omr-settings-mock-${slug}-`));
  process.env.DATA_DIR = testDataDir;
  if (!process.env.API_KEY_SECRET) {
    process.env.API_KEY_SECRET = `test-settings-mock-secret-${Date.now()}`;
  }

  const fixture: SettingsFixture = {
    testDataDir,
    async resetStorage() {
      const core = await import("../../../src/lib/db/core.ts");
      const runtime = await import("../../../src/lib/config/runtimeSettings.ts");
      core.resetDbInstance();
      runtime.resetRuntimeSettingsStateForTests();
      fs.rmSync(testDataDir, { recursive: true, force: true });
      fs.mkdirSync(testDataDir, { recursive: true });
    },
    cleanup() {
      fs.rmSync(testDataDir, { recursive: true, force: true });
    },
  };
  activeFixture = fixture;
  return fixture;
}

/**
 * Write a partial Settings patch through the production
 * `updateSettings → applyRuntimeSettings` pipeline. Hot-reload side effects
 * (route guard snapshot, etc.) fire exactly as they do in `PATCH /api/settings`.
 */
export async function mockSettings(partial: SettingsPatch): Promise<Record<string, unknown>> {
  const settingsDb = await import("../../../src/lib/db/settings.ts");
  return settingsDb.updateSettings(partial);
}

/**
 * Reset the in-process runtime snapshot to the cold-boot default. Called by
 * test `beforeEach` hooks that need a clean slate without nuking the whole
 * fixture directory.
 */
export async function resetSettingsMock(): Promise<void> {
  const runtime = await import("../../../src/lib/config/runtimeSettings.ts");
  runtime.resetRuntimeSettingsStateForTests();
  if (activeFixture) {
    await activeFixture.resetStorage();
  }
}
