/**
 * Local Rust Web Fetch Executor
 *
 * Uses a local rs-webfetch CLI, backed by rs-trafilatura, for lightweight
 * single-page extraction without external API credentials.
 */

import { execFile } from "node:child_process";
import type { WebFetchFormat, WebFetchResult } from "../handlers/webFetch.ts";
import { buildErrorBody, sanitizeErrorMessage } from "../utils/error.ts";

const RS_WEBFETCH_TIMEOUT_MS = 65_000;
const RS_WEBFETCH_MAX_BUFFER = 16 * 1024 * 1024;

interface RsTrafilaturaFetchOptions {
  url: string;
  format: WebFetchFormat;
  includeMetadata: boolean;
}

function execFileText(file: string, args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    execFile(
      file,
      args,
      { timeout: RS_WEBFETCH_TIMEOUT_MS, maxBuffer: RS_WEBFETCH_MAX_BUFFER },
      (error, stdout, stderr) => {
        if (error) {
          reject(new Error(stderr?.trim() || error.message));
          return;
        }
        resolve(stdout);
      }
    );
  });
}

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function extractMarkdownLinks(markdown: string): string[] {
  const links = new Set<string>();
  for (const match of markdown.matchAll(/\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g)) {
    links.add(match[1]);
  }
  return Array.from(links);
}

export async function rsTrafilaturaFetch(opts: RsTrafilaturaFetchOptions): Promise<WebFetchResult> {
  const { url, format, includeMetadata } = opts;

  if (format === "screenshot") {
    const body = buildErrorBody(400, "Local Rust Web Fetch does not support screenshots");
    return { success: false, status: 400, error: body.error.message };
  }

  const bin = process.env.OMNIROUTE_RS_WEBFETCH_BIN || "rs-webfetch";
  const args = ["--format", format === "html" ? "html" : "json", "--timeout", "20"];
  if (format === "links") args.push("--links");
  args.push(url);

  try {
    const stdout = await execFileText(bin, args);

    if (format === "html") {
      return {
        success: true,
        data: {
          provider: "rs-trafilatura",
          url,
          content: stdout.trim(),
          links: [],
          metadata: null,
          screenshot_url: null,
        },
      };
    }

    const parsed = JSON.parse(stdout) as Record<string, unknown>;
    const contentRecord = toRecord(parsed.content);
    const metadataRecord = toRecord(parsed.metadata);
    const content = typeof contentRecord.text === "string" ? contentRecord.text : "";

    return {
      success: true,
      data: {
        provider: "rs-trafilatura",
        url:
          typeof parsed.finalUrl === "string"
            ? parsed.finalUrl
            : typeof parsed.url === "string"
              ? parsed.url
              : url,
        content: format === "links" ? "" : content,
        links: format === "links" ? extractMarkdownLinks(content) : [],
        metadata: includeMetadata
          ? {
              title: typeof metadataRecord.title === "string" ? metadataRecord.title : null,
              description:
                typeof metadataRecord.description === "string" ? metadataRecord.description : null,
            }
          : null,
        screenshot_url: null,
      },
    };
  } catch (err: unknown) {
    const msg =
      err instanceof Error ? sanitizeErrorMessage(err.message) : sanitizeErrorMessage(String(err));
    const body = buildErrorBody(502, msg);
    return { success: false, status: 502, error: body.error.message };
  }
}
