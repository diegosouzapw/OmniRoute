/**
 * Signature Cache — Phase 3
 *
 * Dynamic 3-layer cache for thinking signatures (tool, model family, session).
 * Replaces hardcoded thinking signature patterns with adaptive detection.
 */

// 3-layer cache: tool → model family → session
// Each layer stores patterns detected from responses
const layers = {
  tool: new Map(),      // e.g. "cursor" → Set of signature patterns
  family: new Map(),    // e.g. "claude-sonnet" → Set of signature patterns
  session: new Map(),   // e.g. sessionId → Set of signature patterns
};

// Known default signatures (bootstrap — will be supplemented by learning)
const DEFAULT_SIGNATURES = [
  "<antThinking>",
  "</antThinking>",
  "<thinking>",
  "</thinking>",
  "<internal_thought>",
  "</internal_thought>",
];

// Max entries per cache layer to prevent unbounded growth
const MAX_ENTRIES_PER_LAYER = 500;
const MAX_PATTERNS_PER_KEY = 50;

/**
 * Get all matching signatures for a given context.
 * Checks all 3 layers and merges results with defaults.
 *
 * @param {object} context - { tool?, modelFamily?, sessionId? }
 * @returns {string[]} Array of unique signature patterns
 */
export function getSignatures(context: any = {}) {
  const patterns = new Set(DEFAULT_SIGNATURES);

  // Layer 1: Tool (e.g., "cursor", "cline", "antigravity")
  if (context.tool && layers.tool.has(context.tool)) {
    for (const p of layers.tool.get(context.tool)) patterns.add(p);
  }

  // Layer 2: Model family (e.g., "claude-sonnet", "claude-opus")
  if (context.modelFamily && layers.family.has(context.modelFamily)) {
    for (const p of layers.family.get(context.modelFamily)) patterns.add(p);
  }

  // Layer 3: Session-specific
  if (context.sessionId && layers.session.has(context.sessionId)) {
    for (const p of layers.session.get(context.sessionId)) patterns.add(p);
  }

  return Array.from(patterns);
}

/**
 * Add a discovered signature pattern to the cache.
 *
 * @param {string} pattern - The signature pattern (e.g., "<antThinking>")
 * @param {object} context - { tool?, modelFamily?, sessionId? }
 */
export function addSignature(pattern: any, context: any = {}) {
  if (!pattern || typeof pattern !== "string") return;

  const addToLayer = (layer, key) => {
    if (!key) return;
    if (!layer.has(key)) {
      if (layer.size >= MAX_ENTRIES_PER_LAYER) {
        // Evict oldest entry
        const firstKey = layer.keys().next().value;
        layer.delete(firstKey);
      }
      layer.set(key, new Set());
    }
    const set = layer.get(key);
    if (set.size < MAX_PATTERNS_PER_KEY) {
      set.add(pattern);
    }
  };

  addToLayer(layers.tool, context.tool);
  addToLayer(layers.family, context.modelFamily);
  addToLayer(layers.session, context.sessionId);
}

/**
 * Detect signatures in a text chunk from streaming response.
 * Auto-learns new patterns and adds them to cache.
 *
 * @param {string} text - Streaming text to scan
 * @param {object} context - { tool?, modelFamily?, sessionId? }
 * @returns {{ found: string[], cleaned: string }} Detected tags and cleaned text
 */
export function detectAndLearn(text: any, context: any = {}) {
  if (!text || typeof text !== "string") return { found: [], cleaned: text };

  const found = [];
  let cleaned = text;

  // Check all known signatures
  const known = getSignatures(context);
  for (const sig of known) {
    if (cleaned.includes(sig)) {
      found.push(sig);
      cleaned = cleaned.split(sig).join("");
    }
  }

  // Auto-detect new XML-like thinking tags
  const tagRegex = /<\/?([a-zA-Z_][a-zA-Z0-9_]*(?:Thinking|thinking|thought|Thought|internal_thought))>/g;
  let match;
  while ((match = tagRegex.exec(text)) !== null) {
    const tag = match[0];
    if (!known.includes(tag)) {
      found.push(tag);
      addSignature(tag, context);
      cleaned = cleaned.split(tag).join("");
    }
  }

  return { found, cleaned: cleaned.trim() || cleaned };
}

/**
 * Extract model family from model name
 * "claude-sonnet-4-20250514" → "claude-sonnet"
 * "gpt-4o-2024-08-06" → "gpt-4o"
 */
export function getModelFamily(model) {
  if (!model) return null;
  // Remove date suffixes and version numbers
  const cleaned = model
    .replace(/-\d{4}-\d{2}-\d{2}$/, "") // Remove YYYY-MM-DD suffix
    .replace(/-\d{8,}$/, "")            // Remove YYYYMMDD suffix
    .replace(/-\d+(\.\d+)*$/, "")       // Remove version suffix like -4
    .replace(/@.*$/, "");               // Remove @latest etc.
  // Keep meaningful prefix
  return cleaned || model;
}

/**
 * Get cache stats (for dashboard)
 */
export function getCacheStats() {
  return {
    tool: {
      entries: layers.tool.size,
      patterns: Array.from(layers.tool.values()).reduce((sum, s) => sum + s.size, 0),
    },
    family: {
      entries: layers.family.size,
      patterns: Array.from(layers.family.values()).reduce((sum, s) => sum + s.size, 0),
    },
    session: {
      entries: layers.session.size,
      patterns: Array.from(layers.session.values()).reduce((sum, s) => sum + s.size, 0),
    },
    defaultCount: DEFAULT_SIGNATURES.length,
  };
}

/**
 * Clear all cache layers (for testing)
 */
export function clearCache() {
  layers.tool.clear();
  layers.family.clear();
  layers.session.clear();
}
