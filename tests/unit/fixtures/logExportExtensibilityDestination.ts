import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { __registerLogExportDestinationTypeForTest } from "../../../src/lib/logExport/registry.ts";
import type { LogExportRecord } from "../../../src/lib/logExport/types.ts";

export function register() {
  __registerLogExportDestinationTypeForTest({
    id: "unit-test-sink",
    labelFallback: "Unit Test Sink",
    descriptionFallback: "Fixture",
    secretFields: ["apiToken"],
    fields: [],
    configSchema: z.object({ endpoint: z.string().min(1), apiToken: z.string().min(1) }),
    createClient() {
      const sent: LogExportRecord[][] = [];
      let prepareCalls = 0;
      return {
        async test() {
          return { ok: true, detail: "fixture" };
        },
        async prepare() {
          prepareCalls++;
        },
        async send(records) {
          sent.push([...records]);
          fs.writeFileSync(
            path.join(String(process.env.DATA_DIR), "ext-sent.json"),
            JSON.stringify({ sent, prepareCalls })
          );
        },
      };
    },
  });
}
