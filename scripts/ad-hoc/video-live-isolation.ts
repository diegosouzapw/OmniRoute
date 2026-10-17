#!/usr/bin/env node
/** Private VPS-only homologation preparation. Never opens the source through app DB modules. */
import { randomBytes } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseEnv } from "node:util";

import Database from "better-sqlite3";

export function validateVideoLiveSource(source: string | undefined): string {
  if (!source || !path.isAbsolute(source))
    throw new Error("Explicit absolute source directory required");
  const resolved = fs.realpathSync(source);
  if (!fs.statSync(path.join(resolved, "storage.sqlite")).isFile()) {
    throw new Error("Source database required");
  }
  return resolved;
}

function sourceEncryptionSecret(source: string): string | undefined {
  const values: Record<string, string> = {};
  for (const name of ["server.env", ".env"]) {
    const file = path.join(source, name);
    if (fs.existsSync(file)) Object.assign(values, parseEnv(fs.readFileSync(file, "utf8")));
  }
  return process.env.STORAGE_ENCRYPTION_KEY || values.STORAGE_ENCRYPTION_KEY;
}

export async function prepareVideoLiveIsolation(sourceInput: string | undefined) {
  const source = validateVideoLiveSource(sourceInput);
  const sourceSecret = sourceEncryptionSecret(source);
  // Both consumers validate this fixed private root; a runner's TMPDIR must
  // not make preparation return a context that those consumers will reject.
  const directory = fs.mkdtempSync(path.join("/tmp", "omniroute-video-live-"));
  fs.chmodSync(directory, 0o700);
  let previousEnvironment: Record<string, string | undefined> | undefined;
  try {
    const databasePath = path.join(directory, "storage.sqlite");
    const original = new Database(path.join(source, "storage.sqlite"), {
      readonly: true,
      fileMustExist: true,
    });
    try {
      await original.backup(databasePath);
    } finally {
      original.close();
    }
    fs.chmodSync(databasePath, 0o600);
    const environment = {
      DATA_DIR: directory,
      ...(sourceSecret ? { STORAGE_ENCRYPTION_KEY: sourceSecret } : {}),
      API_KEY_SECRET: randomBytes(32).toString("hex"),
      JWT_SECRET: randomBytes(32).toString("hex"),
      OMNIROUTE_CLI_SALT: randomBytes(32).toString("hex"),
      OMNIROUTE_DISABLE_BACKGROUND_SERVICES: "true",
      OMNIROUTE_DISABLE_CREDENTIAL_HEALTH_CHECK: "true",
      DISABLE_SQLITE_AUTO_BACKUP: "true",
      REQUIRE_API_KEY: "true",
      HOST: "127.0.0.1",
      PORT: "20428",
      API_PORT: "20428",
      DASHBOARD_PORT: "20428",
      OMNIROUTE_PORT: "20428",
    };
    // All secrets stay on the VPS, in a new 0700 directory and 0600 environment file.
    fs.writeFileSync(
      path.join(directory, ".env"),
      Object.entries(environment)
        .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
        .join("\n") + "\n",
      { mode: 0o600, flag: "wx" }
    );
    previousEnvironment = Object.fromEntries(
      Object.keys(environment).map((key) => [key, process.env[key]])
    );
    Object.assign(process.env, environment);
    const db = await import("../../src/lib/db/core.ts");
    // DATA_DIR is captured on first import. Never reset or mutate a previously
    // loaded database just because the process environment now names our copy.
    if (
      db.isCloud ||
      db.isBuildPhase ||
      db.DATA_DIR !== directory ||
      db.SQLITE_FILE !== databasePath ||
      fs.realpathSync(db.getDbInstance().name) !== fs.realpathSync(databasePath)
    ) {
      throw new Error("A fresh process is required for private homologation");
    }
    const keys = await import("../../src/lib/db/apiKeys.ts");
    const settings = await import("../../src/lib/db/settings.ts");
    const providers = await import("../../src/lib/db/providers.ts");
    const { getMachineTokenSync } = await import("../../src/lib/machineToken.ts");
    try {
      // Never let the private test server accept copied production API keys.
      for (const key of await keys.getApiKeys()) await keys.deleteApiKey(key.id);
      const owner = await keys.createApiKey("video-live-owner", "isolated-live-probe", []);
      const stranger = await keys.createApiKey("video-live-stranger", "isolated-live-probe", []);
      await settings.updateSettings({
        cloudEnabled: false,
        modelsDevSyncEnabled: false,
        localOnlyManageScopeBypassEnabled: false,
        customSystemPromptEnabled: false,
        customSystemPrompt: "",
        systemPrompt: { enabled: false, prefixPrompt: "", suffixPrompt: "", prompt: "" },
        payloadRules: null,
        systemTransforms: null,
        ccBridgeTransforms: null,
        modelAliases: {},
        modalityBridgeVideoEnabled: true,
        modalityBridgeVideoModel: "openai/gpt-4o-mini",
        modalityBridgeVideoAudioTranscriptionEnabled: true,
        modalityBridgeAudioEnabled: true,
        modalityBridgeAudioModel: "deepgram/nova-3",
        modalityBridgeCacheEnabled: false,
        modalityBridgeVideoDrilldownEnabled: true,
        modalityBridgeVideoDrilldownRemoteEnabled: true,
      });
      const allowedProviders = new Set(["deepgram", "openai", "groq"]);
      for (const connection of await providers.getProviderConnections()) {
        if (!allowedProviders.has(String(connection.provider))) {
          await providers.deleteProviderConnection(String(connection.id));
        }
      }
      fs.writeFileSync(
        path.join(directory, "client-context.json"),
        JSON.stringify({
          baseUrl: "http://127.0.0.1:20428",
          owner: owner.key,
          stranger: stranger.key,
          cliToken: getMachineTokenSync(),
        }),
        { mode: 0o600, flag: "wx" }
      );
    } finally {
      db.resetDbInstance();
    }
    return { directory, sourceUntouched: true, mode: "diagnostic-homologation" };
  } catch {
    if (previousEnvironment) {
      for (const [key, value] of Object.entries(previousEnvironment)) {
        if (value === undefined) delete process.env[key];
        else process.env[key] = value;
      }
    }
    // Only the directory this invocation created; never a supplied source or broad root.
    fs.rmSync(directory, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    throw new Error("Private homologation preparation failed");
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (!process.argv.includes("--prepare")) {
    console.error(
      "Pass --prepare and OMNIROUTE_VIDEO_LIVE_SOURCE_DIR; no provider calls are made."
    );
    process.exitCode = 2;
  } else {
    prepareVideoLiveIsolation(process.env.OMNIROUTE_VIDEO_LIVE_SOURCE_DIR)
      .then((result) => console.log(JSON.stringify(result)))
      .catch(() => {
        console.error(
          "Isolated Video Bridge preparation failed; inspect private VPS state, not secrets."
        );
        process.exitCode = 1;
      });
  }
}
