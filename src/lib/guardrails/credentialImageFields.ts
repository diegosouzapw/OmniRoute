/** Transport recognition only: encoded image bytes are not credential-bearing text. */
function isBase64(value: unknown): value is string {
  if (typeof value !== "string" || !value.length || value.length % 4 !== 0) return false;
  const padding = value.indexOf("=");
  const body = padding < 0 ? value : value.slice(0, padding);
  const suffix = padding < 0 ? "" : value.slice(padding);
  return body.length > 0 && !/[^A-Za-z0-9+/]/.test(body) && ["", "=", "=="].includes(suffix);
}

function isImageMime(value: unknown): boolean {
  return (
    typeof value === "string" && /^image\/[a-z0-9][a-z0-9.+-]{0,63}$/i.exec(value)?.[0] === value
  );
}

function isImageDataUrl(value: unknown): boolean {
  if (typeof value !== "string") return false;
  const comma = value.indexOf(",");
  const header = value.slice(0, comma);
  return (
    /^data:image\/[a-z0-9][a-z0-9.+-]{0,63};base64$/i.exec(header)?.[0] === header &&
    isBase64(value.slice(comma + 1))
  );
}

function isInlineImageData(record: Record<string, unknown>, parentKey?: string): boolean {
  return (
    ((parentKey === "inlineData" && isImageMime(record.mimeType)) ||
      (parentKey === "inline_data" && isImageMime(record.mime_type))) &&
    isBase64(record.data)
  );
}

/** Exempt only the exact binary field of a recognized image part, never its siblings. */
export function credentialImageField(
  record: Record<string, unknown>,
  parentKey?: string,
  parentType?: unknown
): string | undefined {
  if (record.type === "input_image" && isImageDataUrl(record.image_url)) return "image_url";
  if (parentKey === "image_url" && parentType === "image_url" && isImageDataUrl(record.url))
    return "url";
  if (
    parentKey === "source" &&
    parentType === "image" &&
    record.type === "base64" &&
    isImageMime(record.media_type) &&
    isBase64(record.data)
  )
    return "data";
  if (isInlineImageData(record, parentKey)) return "data";
  return undefined;
}
