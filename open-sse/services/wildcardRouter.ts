/**
 * Wildcard Model Routing — Phase 8
 *
 * Glob-style wildcard matching for model aliases with specificity ranking.
 * Integrates into the existing model resolution pipeline.
 */

/**
 * Match a model name against a pattern with glob wildcards.
 * Supports * (any sequence) and ? (single char).
 *
 * @param {string} model - Model name to match
 * @param {string} pattern - Pattern with wildcards
 * @returns {boolean}
 */
export function wildcardMatch(model, pattern) {
  if (!model || !pattern) return false;
  if (pattern === "*") return true;
  if (pattern === model) return true;

  // Convert glob pattern to regex
  const regexStr = pattern
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\*/g, ".*")
    .replace(/\?/g, ".");
  const regex = new RegExp(`^${regexStr}$`, "i");
  return regex.test(model);
}

/**
 * Calculate specificity score for a pattern.
 * Higher score = more specific match.
 * Used to rank multiple matching patterns.
 *
 * @param {string} pattern
 * @returns {number} Specificity score (higher = more specific)
 */
export function getSpecificity(pattern) {
  if (!pattern) return 0;

  let score = 0;
  // Exact segments (no wildcards) contribute most
  const segments = pattern.split(/[/*?]/);
  for (const seg of segments) {
    if (seg.length > 0) score += seg.length * 10;
  }
  // Wildcards reduce specificity
  const wildcardCount = (pattern.match(/\*/g) || []).length;
  const questionCount = (pattern.match(/\?/g) || []).length;
  score -= wildcardCount * 50;
  score -= questionCount * 5;
  // Longer patterns tend to be more specific
  score += pattern.length;

  return score;
}

/**
 * Find the best matching alias for a model name from a list of alias entries.
 * Returns the most specific match.
 *
 * @param {string} model - Model name to resolve
 * @param {Array<{ pattern: string, target: string, [key: string]: any }>} aliases - Alias entries
 * @returns {{ pattern: string, target: string, specificity: number } | null}
 */
export function resolveWildcardAlias(model, aliases) {
  if (!model || !aliases || !Array.isArray(aliases)) return null;

  const matches = [];
  for (const alias of aliases) {
    const pattern = alias.pattern || alias.alias || alias.from;
    const target = alias.target || alias.model || alias.to;
    if (!pattern || !target) continue;

    if (wildcardMatch(model, pattern)) {
      matches.push({
        pattern,
        target,
        specificity: getSpecificity(pattern),
        ...alias,
      });
    }
  }

  if (matches.length === 0) return null;

  // Sort by specificity (highest first)
  matches.sort((a, b) => b.specificity - a.specificity);
  return matches[0];
}

/**
 * Resolve model through wildcard aliases, falling back to exact match.
 * Can be integrated into existing model resolution.
 *
 * @param {string} model - Requested model name
 * @param {Map|Object} exactAliases - Exact model alias map
 * @param {Array} wildcardAliases - Wildcard pattern aliases
 * @returns {string} Resolved model name
 */
export function resolveModel(model, exactAliases = {}, wildcardAliases = []) {
  if (!model) return model;

  // 1. Check exact aliases first (fastest)
  if (exactAliases instanceof Map) {
    if (exactAliases.has(model)) return exactAliases.get(model);
  } else if (exactAliases[model]) {
    return exactAliases[model];
  }

  // 2. Check wildcard aliases
  const match = resolveWildcardAlias(model, wildcardAliases);
  if (match) return match.target;

  // 3. Return original
  return model;
}
