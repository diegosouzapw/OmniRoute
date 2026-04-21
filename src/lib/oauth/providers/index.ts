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
import { gemini } from "./gemini";
import { antigravity } from "./antigravity";
import { qoder } from "./qoder";
import { qwen } from "./qwen";
import { kimiCoding } from "./kimi-coding";
import { github } from "./github";
import { kiro } from "./kiro";
import { nousResearch } from "./nous-research";
import { cursor } from "./cursor";
import { kilocode } from "./kilocode";
import { cline } from "./cline";
import { zed } from "./zed";
import { trae } from "./trae";
import { gitlabDuo } from "./gitlab-duo";

export const PROVIDERS = {
  claude,
  codex,
  "gemini-cli": gemini,
  antigravity,
  qoder,
  qwen,
  "kimi-coding": kimiCoding,
  github,
  kiro,
  "amazon-q": kiro,
  "nous-research": nousResearch,
  cursor,
  kilocode,
  cline,
  zed,
  trae,
  "gitlab-duo-oauth": gitlabDuo,
};

export default PROVIDERS;
