import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import {
  sourceOutbound,
  renderManagedConfig,
  nativeCheckArgs,
  type ManagedCore,
} from "../../src/lib/services/managedProxy/config.ts";
import { installManagedCore } from "../../src/lib/services/managedProxy/install.ts";

// CI-only official binary check; never serves an upstream or starts a core listener.
if (process.env.CI !== "true") throw new Error("Native managed-core verification runs only in CI");
const root = fs.mkdtempSync(path.join(os.tmpdir(), "managed-core-native-"));
const UUID = "11111111-1111-4111-8111-111111111111";
const vmess =
  "vmess://" +
  Buffer.from(
    JSON.stringify({
      v: "2",
      ps: "synthetic",
      add: "127.0.0.1",
      port: 9,
      id: UUID,
      aid: 0,
      scy: "auto",
      net: "tcp",
      type: "none",
      tls: false,
    })
  ).toString("base64");
const shared = [
  `vless://${UUID}@127.0.0.1:9?security=none`,
  `vless://${UUID}@127.0.0.1:9?security=tls&type=ws&path=%2Fchat&sni=example.invalid`,
  `trojan://synthetic-password@127.0.0.1:9?sni=example.invalid`,
  "ss://YWVzLTEyOC1nY206c3ludGhldGljLXBhc3N3b3Jk@127.0.0.1:9",
  vmess,
];
try {
  for (const core of ["singbox", "xray"] as ManagedCore[]) {
    const executable = await installManagedCore(core, root);
    const sources =
      core === "singbox"
        ? [
            ...shared,
            "hy2://synthetic-password@127.0.0.1:9?sni=example.invalid",
            `tuic://${UUID}:synthetic-password@127.0.0.1:9?sni=example.invalid`,
            "anytls://synthetic-password@127.0.0.1:9?sni=example.invalid",
          ]
        : shared;
    for (let i = 0; i < sources.length; i++) {
      const outbound = sourceOutbound(core, sources[i]);
      const config = renderManagedConfig(core, [{ id: "synthetic", port: 24001, outbound }]);
      const file = path.join(root, `${core}-${i}.json`);
      fs.writeFileSync(file, JSON.stringify(config), { encoding: "utf8", mode: 0o600 });
      const env: NodeJS.ProcessEnv = {};
      for (const key of ["SystemRoot", "WINDIR", "PATH", "TEMP", "TMP"])
        if (process.env[key]) env[key] = process.env[key];
      const output = execFileSync(executable, nativeCheckArgs(core, file), {
        cwd: root,
        env,
        timeout: 15000,
        maxBuffer: 65536,
        windowsHide: true,
        encoding: "utf8",
      });
      if (core === "xray") assert.ok(output.includes("Configuration OK"));
      console.log(`Native ${core} fixture ${i + 1}/${sources.length} accepted`);
    }
  }
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
