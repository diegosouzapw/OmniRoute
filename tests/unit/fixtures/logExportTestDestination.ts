import fs from "node:fs";
import dns from "node:dns";
import v8 from "node:v8";
import path from "node:path";
import { z } from "zod";
import { createBigQueryClientForTest } from "../../../src/lib/logExport/destinations/bigquery.ts";
import { __registerLogExportDestinationTypeForTest } from "../../../src/lib/logExport/registry.ts";
import type { LogExportDestinationType } from "../../../src/lib/logExport/types.ts";

export const testDestination: LogExportDestinationType = {
  id: "child-test-sink",
  labelFallback: "Child test sink",
  descriptionFallback: "Local fixture only",
  fields: [],
  secretFields: ["secret", "serviceAccountJson"],
  configSchema: z.object({
    secret: z.string(),
    output: z.string(),
    mode: z.string().default("records"),
    urls: z.array(z.string()).optional(),
    serviceAccountJson: z.string().optional(),
  }),
  createClient(config) {
    let batches = 0;
    const output = String(config.output);
    return {
      async test() {
        return { ok: true, detail: "fixture" };
      },
      async prepare() {
        if (config.mode === "warning") process.emitWarning("fixture-warning", "DeprecationWarning");
        fs.writeFileSync(
          `${output}.process`,
          JSON.stringify({
            pid: process.pid,
            argv: process.argv,
            execArgv: process.execArgv,
            env: process.execArgv.some((arg) => arg.startsWith("--max-old-space-size="))
              ? process.env
              : {},
          })
        );
      },
      async send(records) {
        batches++;
        if (config.mode === "network") {
          for (const url of config.urls as string[]) {
            const response = await fetch(url);
            if ((await response.text()) !== "loopback-fixture")
              throw new Error("Unexpected response");
          }
        }
        if (config.mode === "proxy-leak") {
          const proxy = new URL(process.env.HTTP_PROXY || "http://fallback.invalid");
          const message = `${proxy.href} ${decodeURIComponent(proxy.username)} ${decodeURIComponent(proxy.password)}`;
          console.error(message);
          throw new Error(message);
        }
        if (config.mode === "oom" && batches === 2) {
          const retained: string[] = [];
          for (let i = 0; ; i++) retained.push(`${i}-`.repeat(2048));
        }
        if (config.mode === "memory") {
          if (
            records.length !== 500 ||
            records.some((record) => !record.requestBody || record.bodiesTruncated)
          )
            throw new Error("Maximum artifact batch lost body content");
          const sample = () =>
            fs.appendFileSync(
              `${output}.memory`,
              `${JSON.stringify({ ...process.memoryUsage(), maxRSS: process.resourceUsage().maxRSS })}\n`
            );
          sample();
          const client = createBigQueryClientForTest(
            {
              projectId: "synthetic",
              datasetId: "fixture",
              tableId: "fixture",
              location: "EU",
              serviceAccountJson: String(config.serviceAccountJson),
              autoCreate: false,
              partitionExpirationDays: 0,
            },
            (async () => {
              sample();
              return Response.json({ access_token: "synthetic-token", expires_in: 3600 });
            }) as typeof fetch
          );
          await client.prepare();
          await client.send(records);
          sample();
          return;
        }
        if (config.mode === "crash" && batches === 3 && process.send) process.exit(23);
        if (config.mode === "hang" && process.send) {
          process.on("SIGTERM", () => {});
          await new Promise(() => {
            setInterval(() => {}, 1000);
          });
        }
        if (config.mode === "fail" && batches === 2) throw new Error(`rejected ${config.secret}`);
        fs.appendFileSync(`${output}.times`, `${Date.now()}\n`);
        // The performance sink deliberately does not copy bodies back to the parent.
        if (config.mode !== "discard") fs.appendFileSync(output, `${JSON.stringify(records)}\n`);
      },
    };
  },
};

export function register(registerDestination = __registerLogExportDestinationTypeForTest) {
  registerDestination(testDestination);
}

// A child-visible fetch fixture for the existing BigQuery runner tests. No network.
export function installBigQueryFetchFixture(config: Record<string, unknown>) {
  if (config.network) {
    // Never resolve a real host: all fixture names map to loopback, including RED.
    dns.lookup = ((
      _hostname: string,
      options: { all?: boolean },
      callback: (...args: unknown[]) => void
    ) => {
      if (options?.all) callback(null, [{ address: "127.0.0.1", family: 4 }]);
      else callback(null, "127.0.0.1", 4);
    }) as unknown as typeof dns.lookup;
    return;
  }
  if (config.memoryOutput) {
    v8.setFlagsFromString("--trace-gc-nvp");
    const timer = setInterval(
      () =>
        fs.appendFileSync(
          String(config.memoryOutput),
          `${JSON.stringify({ ...process.memoryUsage(), maxRSS: process.resourceUsage().maxRSS })}\n`
        ),
      5
    );
    timer.unref();
    return;
  }
  const output = path.join(String(process.env.DATA_DIR), "bigquery-batches.jsonl");
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    const href = String(url);
    if (href.includes("oauth2.googleapis.com/token")) {
      return Response.json({ access_token: "stub-token", expires_in: 3600 });
    }
    if (href.endsWith("/insertAll")) {
      if (config.fixtureFailInsert)
        return Response.json({ error: { message: "backend error" } }, { status: 500 });
      if (config.fixtureInsertDelayMs)
        await new Promise((resolve) => setTimeout(resolve, Number(config.fixtureInsertDelayMs)));
      fs.appendFileSync(output, `${String(init?.body)}\n`);
    }
    return Response.json({});
  }) as typeof fetch;
}
