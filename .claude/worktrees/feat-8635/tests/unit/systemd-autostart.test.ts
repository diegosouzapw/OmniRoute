import { describe, it } from "node:test";
import { ok } from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

describe("Systemd autostart (#8635)", () => {
  const svcPath = "contrib/systemd/omniroute.service";
  const content = readFileSync(svcPath, "utf-8");

  it("service file exists", () => {
    ok(existsSync(svcPath));
    ok(content.length > 200);
  });

  it("defines required systemd sections", () => {
    ok(content.includes("[Unit]"));
    ok(content.includes("[Service]"));
    ok(content.includes("[Install]"));
  });

  it("specifies WantedBy=default.target", () => {
    ok(content.includes("WantedBy=default.target"));
  });
});
