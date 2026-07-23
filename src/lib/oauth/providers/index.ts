/**
 * OAuth Provider Registry — Extracted from monolithic providers.js
 *
 * Each provider is now defined in its own module under providers/.
 * This index re-exports the full PROVIDERS map and utility functions.
 *
 * Provider modules follow the interface:
 *   { config, flowType, buildAuthUrl?, exchangeToken?, requestDeviceCode?, pollToken?, postExchange?, mapTokens }
 *
 * @module lib/oauth/providers/index
 */

import { claude } from "./claude";
import { codex } from "./codex";
import { antigravity } from "./antigravity";
import { agy } from "./agy";
import { qoder } from "./qoder";
import { kimiCoding } from "./kimi-coding";
import { github } from "./github";
import { gheCopilot } from "./ghe-copilot";
import { gitlabDuo } from "./gitlab-duo";
import { kiro } from "./kiro";
import { cursor } from "./cursor";
import { trae } from "./trae";
import { kilocode } from "./kilocode";
import { cline } from "./cline";
import { windsurf } from "./windsurf";
import { grokCli } from "./grok-cli";
import { xaiOauth } from "./xai-oauth";
import { codebuddyCn } from "./codebuddy-cn";
import { zed } from "./zed";
import { zedHosted } from "./zed-hosted";

export const PROVIDERS = {
  claude,
  codex,
  antigravity,
  agy,
  qoder,
  "kimi-coding": kimiCoding,
  github,
  "ghe-copilot": gheCopilot,
  "gitlab-duo": gitlabDuo,
  kiro,
  "amazon-q": kiro,
  cursor,
  trae,
  kilocode,
  cline,
  // clinepass reuses the Cline WorkOS OAuth flow 1:1 (same api.cline.bot host, same token
  // type) — it is a separate catalog entry advertising the cline-pass/* (ClinePass
  // subscription) models. See registry/clinepass/index.ts.
  clinepass: cline,
  windsurf,
  // devin-cli shares the same token format as windsurf (WINDSURF_API_KEY / devin auth login)
  "devin-cli": windsurf,
  // grok-cli carries BOTH the browser PKCE flow and the paste-token import flow
  // under this one entry (#7013) — see grok-cli.ts's mapTokens for the dispatch.
  "grok-cli": grokCli,
  "xai-oauth": xaiOauth,
  "codebuddy-cn": codebuddyCn,
  // Zed IDE credential bridge — uses keychain import, not standard OAuth
  zed,
  "zed-hosted": zedHosted,
};

export default PROVIDERS;
