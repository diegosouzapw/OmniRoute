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

import { claude } from "./claude.js";
import { codex } from "./codex.js";
import { gemini } from "./gemini.js";
import { antigravity } from "./antigravity.js";
import { iflow } from "./iflow.js";
import { qwen } from "./qwen.js";
import { kimiCoding } from "./kimi-coding.js";
import { github } from "./github.js";
import { kiro } from "./kiro.js";
import { cursor } from "./cursor.js";
import { kilocode } from "./kilocode.js";
import { cline } from "./cline.js";

export const PROVIDERS = {
  claude,
  codex,
  "gemini-cli": gemini,
  antigravity,
  iflow,
  qwen,
  "kimi-coding": kimiCoding,
  github,
  kiro,
  cursor,
  kilocode,
  cline,
};

export default PROVIDERS;
