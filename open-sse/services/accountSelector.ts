/**
 * Quota-Aware Account Selection (P2C) — Phase 9
 *
 * Power of Two Choices: pick 2 random accounts, select the healthier one.
 * Uses account health scores from accountFallback.js.
 */

import { getAccountHealth } from "./accountFallback.ts";

/**
 * P2C selection: pick 2 random candidates, return the healthier one.
 * Falls back to random if only 1 candidate.
 *
 * @param {Array} accounts - Available account objects
 * @param {string} [model] - Model name (for model-specific health check)
 * @returns {object|null} Selected account
 */
export function selectAccountP2C(accounts, model = null) {
  if (!accounts || accounts.length === 0) return null;
  if (accounts.length === 1) return accounts[0];

  // Pick 2 random distinct indices
  const i = Math.floor(Math.random() * accounts.length);
  let j = Math.floor(Math.random() * (accounts.length - 1));
  if (j >= i) j++; // Ensure distinct

  const a = accounts[i];
  const b = accounts[j];

  const healthA = getAccountHealth(a, model);
  const healthB = getAccountHealth(b, model);

  return healthA >= healthB ? a : b;
}

/**
 * Select account with strategy support.
 * Integrates P2C as a new strategy alongside existing fill-first and round-robin.
 *
 * @param {Array} accounts - Available accounts
 * @param {string} strategy - "fill-first" | "round-robin" | "p2c" | "random"
 * @param {object} [state] - Strategy state (e.g., lastIndex for round-robin)
 * @param {string} [model] - Model name
 * @returns {{ account: object|null, state: object }}
 */
export function selectAccount(accounts, strategy = "fill-first", state: any = {}, model = null) {
  if (!accounts || accounts.length === 0) {
    return { account: null, state };
  }

  switch (strategy) {
    case "p2c":
      return { account: selectAccountP2C(accounts, model), state };

    case "random":
      return {
        account: accounts[Math.floor(Math.random() * accounts.length)],
        state,
      };

    case "round-robin": {
      const lastIndex = state.lastIndex ?? -1;
      const nextIndex = (lastIndex + 1) % accounts.length;
      return {
        account: accounts[nextIndex],
        state: { ...state, lastIndex: nextIndex },
      };
    }

    case "fill-first":
    default:
      return { account: accounts[0], state };
  }
}
