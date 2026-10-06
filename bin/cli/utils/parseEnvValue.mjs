/**
 * Parse a `.env` value with dotenv-compatible comment handling.
 *
 * Without this, `KEY=value  # note` stored the comment text as part of the
 * value. The shipped .env ships exactly such a line for QUOTA_STORE_DRIVER, and
 * consumers compare it with `===`, so annotating a variable inline silently
 * disabled it (#10100).
 *
 * Quoted values are returned verbatim — a `#` inside quotes is data. For
 * unquoted values a `#` *preceded by whitespace* starts a comment, so
 * `pass#word` is preserved.
 */
export function parseEnvValue(raw) {
  const value = String(raw).trim();

  const quoted = value.match(/^(['"])([\s\S]*)\1\s*(?:#.*)?$/);
  if (quoted) return quoted[2];

  const commentIdx = value.search(/\s#/);
  return (commentIdx === -1 ? value : value.slice(0, commentIdx)).trim();
}
