// AUTO-GENERATED from docs/reference/openapi.yaml. Do not edit.
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { readFileSync } from "node:fs";

export function register_oauth(parent) {
  const tag = parent.command("oauth").description("OAuth endpoints");
  tag
    .command("get-api-oauth-provider-action-")
    .description("OAuth flow handler")
    .requiredOption("--provider <provider>", "")
    .requiredOption("--action <action>", "")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/oauth/{provider}/{action}";
      url = url.replace("{provider}", encodeURIComponent(opts.provider ?? ""));
      url = url.replace("{action}", encodeURIComponent(opts.action ?? ""));
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("get-api-oauth-cursor-auto-import")
    .description("Auto-import Cursor OAuth credentials")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/oauth/cursor/auto-import";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("get-api-oauth-cursor-import")
    .description("Get Cursor import status")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/oauth/cursor/import";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("post-api-oauth-cursor-import")
    .description("Import Cursor OAuth credentials")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/oauth/cursor/import";
      let body;
      if (opts.body) {
        body = opts.body.startsWith("@")
          ? JSON.parse(readFileSync(opts.body.slice(1), "utf8"))
          : JSON.parse(opts.body);
      }
      const res = await apiFetch(url, {
        method: "POST",
        body,
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("get-api-oauth-kiro-auto-import")
    .description("Auto-import Kiro OAuth credentials")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/oauth/kiro/auto-import";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("get-api-oauth-kiro-import")
    .description("Get Kiro import status")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/oauth/kiro/import";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("post-api-oauth-kiro-import")
    .description("Import Kiro OAuth credentials")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/oauth/kiro/import";
      let body;
      if (opts.body) {
        body = opts.body.startsWith("@")
          ? JSON.parse(readFileSync(opts.body.slice(1), "utf8"))
          : JSON.parse(opts.body);
      }
      const res = await apiFetch(url, {
        method: "POST",
        body,
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("get-api-oauth-kiro-social-authorize")
    .description("Initiate Kiro social OAuth authorization")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/oauth/kiro/social-authorize";
      const res = await apiFetch(url, {
        method: "GET",
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
  tag
    .command("post-api-oauth-kiro-social-exchange")
    .description("Exchange Kiro social OAuth token")
    .option("--body <jsonOrPath>", "JSON body or @path/to/file.json")
    .action(async (opts, cmd) => {
      const gOpts = cmd.optsWithGlobals();
      let url = "/api/oauth/kiro/social-exchange";
      let body;
      if (opts.body) {
        body = opts.body.startsWith("@")
          ? JSON.parse(readFileSync(opts.body.slice(1), "utf8"))
          : JSON.parse(opts.body);
      }
      const res = await apiFetch(url, {
        method: "POST",
        body,
        baseUrl: gOpts.baseUrl,
        apiKey: gOpts.apiKey,
      });
      const data = res.ok ? await res.json() : await res.text();
      emit(data, gOpts);
    });
}
