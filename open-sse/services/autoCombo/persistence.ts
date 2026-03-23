/**
 * Auto-Combo Adaptation Persistence
 *
 * Saves and restores scoring adaptation state so learned provider
 * preferences survive server restarts.
 */

import fs from "fs";
import path from "path";
import { resolveDataDir } from "../../../src/lib/dataPaths";

export interface AdaptationState {
  comboId: string;
  providerScores: Record<string, number>;
  exclusionHistory: Array<{
    provider: string;
    excludedAt: string;
    cooldownMs: number;
    reason: string;
  }>;
  modePackHistory: Array<{ pack: string; activatedAt: string }>;
  totalDecisions: number;
  explorationHits: number;
  lastUpdated: string;
}

const PERSISTENCE_DIR = resolveDataDir();
const STATE_FILE = path.join(PERSISTENCE_DIR, "auto_combo_state.json");

let stateCache = new Map<string, AdaptationState>();

/**
 * Save adaptation state for a combo.
 */
export function saveAdaptationState(state: AdaptationState): void {
  stateCache.set(state.comboId, { ...state, lastUpdated: new Date().toISOString() });
  persistToDisk();
}

/**
 * Load adaptation state for a combo.
 */
export function loadAdaptationState(comboId: string): AdaptationState | null {
  if (stateCache.size === 0) loadFromDisk();
  return stateCache.get(comboId) || null;
}

/**
 * List all saved adaptation states.
 */
export function listAdaptationStates(): AdaptationState[] {
  if (stateCache.size === 0) loadFromDisk();
  return [...stateCache.values()];
}

/**
 * Delete adaptation state for a combo.
 */
export function deleteAdaptationState(comboId: string): boolean {
  const existed = stateCache.delete(comboId);
  if (existed) persistToDisk();
  return existed;
}

/**
 * Record a routing decision in the adaptation state.
 */
export function recordDecision(
  comboId: string,
  provider: string,
  score: number,
  wasExploration: boolean
): void {
  let state = stateCache.get(comboId);
  if (!state) {
    state = {
      comboId,
      providerScores: {},
      exclusionHistory: [],
      modePackHistory: [],
      totalDecisions: 0,
      explorationHits: 0,
      lastUpdated: new Date().toISOString(),
    };
  }

  // Exponential moving average for provider scores
  const alpha = 0.1;
  const prev = state.providerScores[provider] || 0.5;
  state.providerScores[provider] = prev * (1 - alpha) + score * alpha;

  state.totalDecisions++;
  if (wasExploration) state.explorationHits++;
  state.lastUpdated = new Date().toISOString();

  stateCache.set(comboId, state);

  // Persist every 10 decisions
  if (state.totalDecisions % 10 === 0) persistToDisk();
}

function persistToDisk(): void {
  try {
    if (!fs.existsSync(PERSISTENCE_DIR)) {
      fs.mkdirSync(PERSISTENCE_DIR, { recursive: true });
    }
    const data = Object.fromEntries(stateCache);
    fs.writeFileSync(STATE_FILE, JSON.stringify(data, null, 2));
  } catch {
    /* disk write failure — non-fatal */
  }
}

function loadFromDisk(): void {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const raw = fs.readFileSync(STATE_FILE, "utf-8");
      const data = JSON.parse(raw) as Record<string, AdaptationState>;
      stateCache = new Map(Object.entries(data));
    }
  } catch {
    /* disk read failure — start fresh */
  }
}
