/**
 * decodeUserinfo — guarded percent-decoding for proxy URL userinfo segments.
 *
 * Correctly encoded values decode as before ("user%40name" -> "user@name").
 * A literal "%" ("user%name") makes decodeURIComponent throw URIError;
 * fall back to the raw value instead of rejecting — the raw value may be
 * the correct credential.
 */
export function decodeUserinfo(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
