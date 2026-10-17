import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test(
  "payload traffic requires existing management authorization before metrics read",
  { timeout: 1000 },
  () => {
    const route = fs.readFileSync(
      new URL("../../src/app/api/settings/proxies/traffic/route.ts", import.meta.url),
      "utf8"
    );
    assert.ok(route.includes('from "@/lib/api/requireManagementAuth"'));
    assert.match(
      route,
      /const authError = await requireManagementAuth\(request\);\s*if \(authError\) return authError;/
    );
    assert.ok(
      route.indexOf("requireManagementAuth(request)") <
        route.indexOf("Response.json(getProxyTraffic()")
    );
    assert.ok(route.includes('"Cache-Control": "no-store"'));
  }
);
