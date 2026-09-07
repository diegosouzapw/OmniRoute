const SOURCE_EXT = ["ts", "tsx", "js", "jsx", "mjs", "cjs", "mts", "cts"] as const;
const NATIVE_EXT = ["node", "so", "dylib", "dll"] as const;
const LEADING_PATH_PUNCTUATION = "'\"`([{<";
const TRAILING_PATH_PUNCTUATION = "'\"`)]}>.,;:!?";
const PATH_SPAN_END_PUNCTUATION = "'\"`)]}>.,;:!?";
const FILE_URI_PREFIX = "file://";
const HTTP_METHODS = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "OPTIONS",
  "HEAD",
  "CONNECT",
  "TRACE",
] as const;
const CLEAR_PROSE_BOUNDARIES = [
  "after",
  "because",
  "before",
  "but",
  "crashed",
  "denied",
  "eacces",
  "enoent",
  "expired",
  "failed",
  "rejected",
  "retry",
  "then",
  "when",
  "while",
] as const;
const POSIX_FILESYSTEM_ROOTS = [
  "/Users",
  "/app",
  "/boot",
  "/data",
  "/dev",
  "/etc",
  "/home",
  "/media",
  "/mnt",
  "/nix",
  "/opt",
  "/private",
  "/proc",
  "/root",
  "/run",
  "/srv",
  "/sys",
  "/tmp",
  "/usr",
  "/var",
  "/workspace",
] as const;
const WINDOWS_ROOT_RELATIVE_ROOTS = new Set([
  "program files",
  "programdata",
  "temp",
  "users",
  "windows",
]);

function isWindowsAbsolutePathAt(value: string, start: number): boolean {
  const remaining = value.length - start;
  if (remaining > 2) {
    const first = value.charCodeAt(start);
    const second = value.charCodeAt(start + 1);
    if ((first === 0x5c && second === 0x5c) || (first === 0x2f && second === 0x2f)) {
      return true;
    }
  }
  if (remaining < 3 || value.charCodeAt(start + 1) !== 0x3a) return false;
  const driveLetter = value.charCodeAt(start);
  const isAsciiLetter =
    (driveLetter >= 0x41 && driveLetter <= 0x5a) || (driveLetter >= 0x61 && driveLetter <= 0x7a);
  return (
    isAsciiLetter && (value.charCodeAt(start + 2) === 0x2f || value.charCodeAt(start + 2) === 0x5c)
  );
}

function isWindowsAbsolutePath(value: string): boolean {
  return isWindowsAbsolutePathAt(value, 0);
}

function isWindowsRootRelativePathAt(value: string, start: number): boolean {
  if (
    value.charCodeAt(start) !== 0x5c ||
    value.charCodeAt(start + 1) === 0x5c ||
    isWhitespace(value[start + 1])
  ) {
    return false;
  }

  const tokenEnd = findTokenEnd(value, start);
  let firstSeparator = start + 1;
  while (firstSeparator < tokenEnd && value.charCodeAt(firstSeparator) !== 0x5c) {
    firstSeparator++;
  }
  const root = value.slice(start + 1, firstSeparator).toLowerCase();
  if (WINDOWS_ROOT_RELATIVE_ROOTS.has(root)) return true;
  return (
    firstSeparator < tokenEnd - 1 || tokenContainsPathExtensionEvidence(value, start + 1, tokenEnd)
  );
}

function hasAbsoluteFileUriAt(value: string, start: number): boolean {
  const prefixEnd = start + FILE_URI_PREFIX.length;
  return (
    value.length > prefixEnd &&
    value.slice(start, prefixEnd).toLowerCase() === FILE_URI_PREFIX &&
    !isWhitespace(value[prefixEnd])
  );
}

function hasAbsoluteFileUri(value: string): boolean {
  return hasAbsoluteFileUriAt(value, 0);
}

function isSyntacticallyAbsolutePathAt(value: string, start: number): boolean {
  return (
    value.charCodeAt(start) === 0x2f ||
    isWindowsAbsolutePathAt(value, start) ||
    isWindowsRootRelativePathAt(value, start) ||
    hasAbsoluteFileUriAt(value, start)
  );
}

function isAsciiDigit(code: number): boolean {
  return code >= 0x30 && code <= 0x39;
}

function isAsciiLetter(code: number): boolean {
  return (code >= 0x41 && code <= 0x5a) || (code >= 0x61 && code <= 0x7a);
}

function isAsciiAlphaNumeric(code: number): boolean {
  return isAsciiDigit(code) || isAsciiLetter(code);
}

function hasHttpUrlSchemeBefore(value: string, slashIndex: number): boolean {
  for (const scheme of ["http:", "https:"]) {
    const schemeStart = slashIndex - scheme.length;
    if (schemeStart < 0 || value.slice(schemeStart, slashIndex).toLowerCase() !== scheme) continue;
    if (schemeStart === 0 || !isAsciiAlphaNumeric(value.charCodeAt(schemeStart - 1))) return true;
  }
  return false;
}

function isWhitespace(value: string): boolean {
  return /\s/.test(value);
}

function isRouteContextWord(value: string): boolean {
  return value === "Route" || (HTTP_METHODS as readonly string[]).includes(value);
}

function hasRouteContextBefore(value: string, candidateIndex: number): boolean {
  let index = candidateIndex - 1;
  while (
    index >= 0 &&
    (isWhitespace(value[index]) ||
      value.charCodeAt(index) === 0x28 ||
      value.charCodeAt(index) === 0x3a)
  ) {
    index--;
  }

  const contextEnd = index + 1;
  while (index >= 0 && isAsciiAlphaNumeric(value.charCodeAt(index))) index--;
  return isRouteContextWord(value.slice(index + 1, contextEnd));
}

function isRouteContextToken(value: string): boolean {
  let end = value.length;
  while (end > 0 && !isAsciiAlphaNumeric(value.charCodeAt(end - 1))) end--;
  let start = end;
  while (start > 0 && isAsciiAlphaNumeric(value.charCodeAt(start - 1))) start--;
  return isRouteContextWord(value.slice(start, end));
}

function matchesPosixFilesystemRootAt(value: string, start: number, root: string): boolean {
  if (!value.startsWith(root, start)) return false;
  const rootEnd = start + root.length;
  return (
    rootEnd === value.length ||
    value.charCodeAt(rootEnd) === 0x2f ||
    PATH_SPAN_END_PUNCTUATION.includes(value[rootEnd])
  );
}

function isKnownPosixFilesystemPathAt(value: string, start: number): boolean {
  return POSIX_FILESYSTEM_ROOTS.some((root) => matchesPosixFilesystemRootAt(value, start, root));
}

function isKnownPosixFilesystemPath(value: string): boolean {
  return isKnownPosixFilesystemPathAt(value, 0);
}

function looksLikeAbsolutePath(token: string): boolean {
  // POSIX: common filesystem roots, with or without a source extension.
  // Windows: drive-letter, UNC, or extended-length absolute paths.
  // Source-file paths rooted elsewhere remain covered by SOURCE_EXT below.
  if (token.length < 4 || token.length > 2048) return false;
  const isPosix = token.charCodeAt(0) === 0x2f;
  const isWindows = isWindowsAbsolutePath(token) || isWindowsRootRelativePathAt(token, 0);
  if (!isPosix && !isWindows) return false;
  if (isWindows) return true;
  if (isKnownPosixFilesystemPath(token)) return true;
  const dot = token.lastIndexOf(".");
  if (dot <= 0 || dot === token.length - 1) return false;
  const extension = token
    .slice(dot + 1)
    .split(":", 1)[0]
    .toLowerCase();
  return (
    (SOURCE_EXT as readonly string[]).includes(extension) ||
    (NATIVE_EXT as readonly string[]).includes(extension)
  );
}

function redactAbsolutePathToken(token: string, followsRouteContext: boolean): string {
  let start = 0;
  let end = token.length;

  while (start < end && LEADING_PATH_PUNCTUATION.includes(token[start])) start++;
  while (end > start && TRAILING_PATH_PUNCTUATION.includes(token[end - 1])) end--;

  const candidate = token.slice(start, end);
  const isFileUri = hasAbsoluteFileUri(candidate);
  const pathCandidate = isFileUri ? candidate.slice(FILE_URI_PREFIX.length) : candidate;

  if (
    !isFileUri &&
    !isWindowsAbsolutePath(pathCandidate) &&
    !isWindowsRootRelativePathAt(pathCandidate, 0) &&
    pathCandidate.charCodeAt(0) === 0x2f &&
    followsRouteContext
  ) {
    return token;
  }
  if (!isFileUri && !looksLikeAbsolutePath(pathCandidate)) return token;
  return `${token.slice(0, start)}<path>${token.slice(end)}`;
}

function findPathQuote(value: string, start: number, quote: string, takeFirst: boolean): number {
  let candidate = value.indexOf(quote, start);
  if (takeFirst || candidate < 0) return candidate < 0 ? value.length : candidate;

  while (candidate < value.length) {
    const nextQuote = value.indexOf(quote, candidate + 1);
    if (nextQuote < 0) return candidate;
    // Two separately quoted absolute paths are unambiguous. Close the first
    // candidate so the second one is scanned on its own; otherwise keep
    // consuming quotes fail-closed because POSIX filenames may contain them.
    if (isSyntacticallyAbsolutePathAt(value, nextQuote + 1)) return candidate;
    candidate = nextQuote;
  }
  return value.length;
}

function redactQuotedAbsolutePaths(value: string): string {
  const parts: string[] = [];
  let copyStart = 0;
  let index = 0;

  while (index < value.length) {
    const quote = value[index];
    if (quote !== "'" && quote !== '"' && quote !== "`") {
      index++;
      continue;
    }
    const candidateStart = index + 1;
    if (!isSyntacticallyAbsolutePathAt(value, candidateStart)) {
      index++;
      continue;
    }

    const isShieldedRoute =
      value.charCodeAt(candidateStart) === 0x2f &&
      !isWindowsAbsolutePathAt(value, candidateStart) &&
      hasRouteContextBefore(value, index);
    // Route/API contexts use their first closing quote so a later quoted
    // filesystem path is still scanned independently. Filesystem candidates
    // take the last matching quote on the line: POSIX filenames may themselves
    // contain quote characters, whitespace, and punctuation, so earlier
    // matches are ambiguous and must fail closed rather than expose a suffix.
    const closingQuote = findPathQuote(value, candidateStart, quote, isShieldedRoute);
    if (isShieldedRoute) {
      if (closingQuote >= value.length) break;
      index = closingQuote + 1;
      continue;
    }
    parts.push(value.slice(copyStart, candidateStart), "<path>");
    copyStart = closingQuote;

    if (closingQuote >= value.length) break;
    index = closingQuote + 1;
  }

  if (parts.length === 0) return value;
  parts.push(value.slice(copyStart));
  return parts.join("");
}

function findPathExtensionEnd(value: string, dot: number): number {
  let end = dot + 1;
  const maxExtensionEnd = Math.min(value.length, end + 16);
  while (end < maxExtensionEnd && isAsciiAlphaNumeric(value.charCodeAt(end))) end++;
  if (end === dot + 1 || (end === maxExtensionEnd && isAsciiAlphaNumeric(value.charCodeAt(end)))) {
    return -1;
  }
  let hasLetter = false;
  for (let index = dot + 1; index < end; index++) {
    if (isAsciiLetter(value.charCodeAt(index))) hasLetter = true;
  }
  if (!hasLetter) return -1;

  while (value.charCodeAt(end) === 0x3a) {
    let coordinateEnd = end + 1;
    if (!isAsciiDigit(value.charCodeAt(coordinateEnd))) break;
    while (coordinateEnd < value.length && isAsciiDigit(value.charCodeAt(coordinateEnd))) {
      coordinateEnd++;
    }
    end = coordinateEnd;
  }

  if (
    end === value.length ||
    isWhitespace(value[end]) ||
    PATH_SPAN_END_PUNCTUATION.includes(value[end])
  ) {
    return end;
  }
  return -1;
}

function findTokenEnd(value: string, start: number): number {
  let end = start;
  while (end < value.length && !isWhitespace(value[end])) end++;
  return end;
}

function findExtensionEndInToken(value: string, start: number, end: number): number {
  let lastExtensionEnd = -1;
  for (let index = start; index < end; index++) {
    const code = value.charCodeAt(index);
    if (code === 0x2f || code === 0x5c) {
      lastExtensionEnd = -1;
      continue;
    }
    if (code !== 0x2e) continue;
    const extensionEnd = findPathExtensionEnd(value, index);
    if (extensionEnd >= 0 && extensionEnd <= end) lastExtensionEnd = extensionEnd;
  }
  return lastExtensionEnd;
}

function tokenContainsPathExtensionEvidence(value: string, start: number, end: number): boolean {
  for (let dot = start; dot < end; dot++) {
    if (value.charCodeAt(dot) !== 0x2e) continue;
    let extensionEnd = dot + 1;
    const maxExtensionEnd = Math.min(end, extensionEnd + 16);
    let hasLetter = false;
    while (extensionEnd < maxExtensionEnd && isAsciiAlphaNumeric(value.charCodeAt(extensionEnd))) {
      if (isAsciiLetter(value.charCodeAt(extensionEnd))) hasLetter = true;
      extensionEnd++;
    }
    if (
      extensionEnd === dot + 1 ||
      !hasLetter ||
      (extensionEnd === maxExtensionEnd &&
        extensionEnd < end &&
        isAsciiAlphaNumeric(value.charCodeAt(extensionEnd)))
    ) {
      continue;
    }
    if (
      extensionEnd === end ||
      value.charCodeAt(extensionEnd) === 0x2f ||
      value.charCodeAt(extensionEnd) === 0x5c ||
      PATH_SPAN_END_PUNCTUATION.includes(value[extensionEnd])
    ) {
      return true;
    }
  }
  return false;
}

function tokenContainsPathSeparator(value: string, start: number, end: number): boolean {
  for (let index = start; index < end; index++) {
    const code = value.charCodeAt(index);
    if (code === 0x2f || code === 0x5c) return true;
  }
  return false;
}

function remainderContainsFilesystemSeparator(value: string, start: number): boolean {
  let tokenStart = start;
  let previousToken = "";
  while (tokenStart < value.length) {
    while (tokenStart < value.length && isWhitespace(value[tokenStart])) tokenStart++;
    if (tokenStart >= value.length) return false;

    const tokenEnd = findTokenEnd(value, tokenStart);
    const token = value.slice(tokenStart, tokenEnd).toLowerCase();
    const isHttpUrl = token.includes("http://") || token.includes("https://");
    let separatorIndex = tokenStart;
    while (
      separatorIndex < tokenEnd &&
      value.charCodeAt(separatorIndex) !== 0x2f &&
      value.charCodeAt(separatorIndex) !== 0x5c
    ) {
      separatorIndex++;
    }
    const precedingSeparatorCode =
      separatorIndex > tokenStart ? value.charCodeAt(separatorIndex - 1) : -1;
    const contextIndex =
      precedingSeparatorCode === 0x27 ||
      precedingSeparatorCode === 0x22 ||
      precedingSeparatorCode === 0x60
        ? separatorIndex - 1
        : separatorIndex;
    const isShieldedRoute =
      separatorIndex < tokenEnd &&
      value.charCodeAt(separatorIndex) === 0x2f &&
      !isWindowsAbsolutePathAt(value, separatorIndex) &&
      (isRouteContextToken(previousToken) || hasRouteContextBefore(value, contextIndex));
    if (!isHttpUrl && separatorIndex < tokenEnd && !isShieldedRoute) return true;
    previousToken = value.slice(tokenStart, tokenEnd);
    tokenStart = tokenEnd;
  }
  return false;
}

function trimPathSpanEnd(value: string, start: number, end: number): number {
  while (end > start && PATH_SPAN_END_PUNCTUATION.includes(value[end - 1])) end--;
  return end;
}

function isClearProseBoundaryToken(value: string, start: number, end: number): boolean {
  while (start < end && LEADING_PATH_PUNCTUATION.includes(value[start])) start++;
  end = trimPathSpanEnd(value, start, end);
  return (CLEAR_PROSE_BOUNDARIES as readonly string[]).includes(
    value.slice(start, end).toLowerCase()
  );
}

function findUnquotedPathEnd(
  value: string,
  start: number,
  acceptFirstTokenPunctuation: boolean,
  acceptEndpointBeforeAnotherAbsolute: boolean,
  failClosedAmbiguity: boolean
): number {
  let tokenStart = start;
  let isFirstToken = true;
  let firstTokenEnd = -1;
  let firstTrimmedTokenEnd = -1;
  let lastPathTokenEnd = -1;
  let resolvedExtensionEnd = -1;
  let hasFilesystemEvidence = false;
  let hasUnresolvedFragments = false;

  const resolveEndpoint = (): number => {
    if (hasUnresolvedFragments) {
      return failClosedAmbiguity || hasFilesystemEvidence ? value.length : -1;
    }
    if (resolvedExtensionEnd >= 0) return resolvedExtensionEnd;
    if (hasFilesystemEvidence && lastPathTokenEnd >= 0) return lastPathTokenEnd;
    if (
      acceptFirstTokenPunctuation &&
      firstTrimmedTokenEnd >= 0 &&
      firstTrimmedTokenEnd < firstTokenEnd
    ) {
      return firstTrimmedTokenEnd;
    }
    return -1;
  };

  while (tokenStart < value.length) {
    const tokenEnd = findTokenEnd(value, tokenStart);
    const extensionEnd = findExtensionEndInToken(value, tokenStart, tokenEnd);
    const trimmedTokenEnd = trimPathSpanEnd(value, tokenStart, tokenEnd);

    if (isFirstToken) {
      firstTokenEnd = tokenEnd;
      firstTrimmedTokenEnd = trimmedTokenEnd;
      lastPathTokenEnd = trimmedTokenEnd;
      // A prose-looking token may itself be a directory name. It is a safe
      // boundary only when no later token carries path-separator evidence;
      // otherwise keep scanning so a filesystem suffix cannot survive.
    } else if (
      isClearProseBoundaryToken(value, tokenStart, tokenEnd) &&
      (!remainderContainsFilesystemSeparator(value, tokenEnd) ||
        (!failClosedAmbiguity && !hasFilesystemEvidence))
    ) {
      return resolveEndpoint();
    }

    const containsSeparator = tokenContainsPathSeparator(value, tokenStart, tokenEnd);
    const containsExtensionEvidence = tokenContainsPathExtensionEvidence(
      value,
      tokenStart,
      tokenEnd
    );
    if (containsSeparator) {
      lastPathTokenEnd = trimmedTokenEnd;
      hasFilesystemEvidence = true;
      hasUnresolvedFragments = false;
      resolvedExtensionEnd = extensionEnd >= 0 ? extensionEnd : -1;
      if (extensionEnd < 0 && containsExtensionEvidence) {
        resolvedExtensionEnd = trimmedTokenEnd;
      }
    } else if (extensionEnd >= 0) {
      resolvedExtensionEnd = extensionEnd;
      hasFilesystemEvidence = true;
      hasUnresolvedFragments = false;
    } else if (containsExtensionEvidence) {
      resolvedExtensionEnd = trimmedTokenEnd;
      hasFilesystemEvidence = true;
      hasUnresolvedFragments = false;
    } else if (!isFirstToken) {
      hasUnresolvedFragments = true;
    }

    let nextTokenStart = tokenEnd;
    while (nextTokenStart < value.length && isWhitespace(value[nextTokenStart])) nextTokenStart++;
    if (nextTokenStart >= value.length) return resolveEndpoint();
    if (isSyntacticallyAbsolutePathAt(value, nextTokenStart)) {
      const endpoint = resolveEndpoint();
      if (endpoint >= 0) return endpoint;
      return acceptEndpointBeforeAnotherAbsolute ? lastPathTokenEnd : -1;
    }

    tokenStart = nextTokenStart;
    isFirstToken = false;
  }
  return resolveEndpoint();
}

function isUnquotedPosixSpanCandidateAt(value: string, start: number): boolean {
  const tokenEnd = findTokenEnd(value, start);
  const token = value.slice(start, tokenEnd);
  if (isKnownPosixFilesystemPath(token)) return true;
  if (
    findExtensionEndInToken(value, start, tokenEnd) >= 0 ||
    tokenContainsPathExtensionEvidence(value, start, tokenEnd)
  ) {
    return true;
  }

  let slashCount = 0;
  for (let index = start; index < tokenEnd; index++) {
    if (value.charCodeAt(index) === 0x2f) slashCount++;
  }
  // Any boundary-delimited absolute POSIX token is filesystem-sensitive by
  // default. Explicit Route/HTTP context is shielded by the caller before this
  // candidate check, so `/vault` is redacted while `Route /vault` is retained.
  return slashCount >= 1 && token.length > 1;
}

function redactUnquotedAbsolutePathSpans(value: string): string {
  const parts: string[] = [];
  let copyStart = 0;
  let index = 0;

  while (index < value.length) {
    const previous = index > 0 ? value[index - 1] : "";
    const followsQuote = previous === "'" || previous === '"' || previous === "`";
    const hasCommonBoundary =
      index === 0 ||
      isWhitespace(previous) ||
      LEADING_PATH_PUNCTUATION.includes(previous) ||
      previous === "=" ||
      previous === ":" ||
      previous === "," ||
      previous === ";" ||
      previous === "." ||
      previous === ">" ||
      previous === "|";
    const startsForwardSlashUnc =
      value.charCodeAt(index) === 0x2f && value.charCodeAt(index + 1) === 0x2f;
    const startsHttpUrl =
      startsForwardSlashUnc && previous === ":" && hasHttpUrlSchemeBefore(value, index);
    const isWindowsPath =
      !followsQuote &&
      (isWindowsAbsolutePathAt(value, index) || isWindowsRootRelativePathAt(value, index)) &&
      !startsHttpUrl;
    const isFileUriPath = !followsQuote && hasAbsoluteFileUriAt(value, index);
    const isPosixPath =
      !followsQuote &&
      value.charCodeAt(index) === 0x2f &&
      value.charCodeAt(index + 1) !== 0x2f &&
      !hasRouteContextBefore(value, index) &&
      isUnquotedPosixSpanCandidateAt(value, index);
    const hasBoundary = hasCommonBoundary || (isWindowsPath && previous === ":");
    if (!hasBoundary || (!isWindowsPath && !isFileUriPath && !isPosixPath)) {
      index++;
      continue;
    }

    // Whitespace makes an unquoted path ambiguous. Extend through adjacent
    // separator-bearing tokens or to a deterministic filename extension.
    // Unequivocal Windows, file-URI, and known-root candidates fail closed;
    // arbitrary extensionless POSIX text falls back to token-level handling so
    // ordinary `/x/y` route text is not redacted indiscriminately.
    const isKnownPosixPath = isKnownPosixFilesystemPathAt(value, index);
    const pathEnd = findUnquotedPathEnd(
      value,
      index,
      isWindowsPath || isFileUriPath || isKnownPosixPath,
      isWindowsPath || isFileUriPath || isKnownPosixPath,
      isWindowsPath || isFileUriPath || isKnownPosixPath
    );
    if (pathEnd < 0) {
      const mustFailClosed = isWindowsPath || isFileUriPath || isKnownPosixPath;
      if (mustFailClosed) {
        // An unequivocal filesystem prefix with an unknowable endpoint must
        // fail closed over the rest of the first line rather than expose a
        // suffix such as `Files\\secret` or `My Project`.
        parts.push(value.slice(copyStart, index), "<path>");
        copyStart = value.length;
        index = value.length;
        break;
      }
      index++;
      continue;
    }
    parts.push(value.slice(copyStart, index), "<path>");
    copyStart = pathEnd;
    index = pathEnd;
  }

  if (parts.length === 0) return value;
  parts.push(value.slice(copyStart));
  return parts.join("");
}

function isPhysicalLineSeparator(code: number): boolean {
  return code === 0x0a || code === 0x0d || code === 0x2028 || code === 0x2029;
}

function serializedLineSeparatorLengthAt(value: string, start: number): number {
  if (value.charCodeAt(start) !== 0x5c) return 0;
  const marker = value[start + 1]?.toLowerCase();
  if (marker === "n" || marker === "r") return 2;
  const unicodeMarker = value.slice(start + 1, start + 6).toLowerCase();
  return unicodeMarker === "u000a" ||
    unicodeMarker === "u000d" ||
    unicodeMarker === "u2028" ||
    unicodeMarker === "u2029"
    ? 6
    : 0;
}

function looksLikeRelativeStackLocation(token: string): boolean {
  if (token.length < 6 || token.length > 2048) return false;

  const lastForwardSlash = token.lastIndexOf("/");
  const lastBackslash = token.lastIndexOf("\\");
  const lastSeparator = Math.max(lastForwardSlash, lastBackslash);
  if (lastSeparator === token.length - 1) return false;

  const columnSeparator = token.lastIndexOf(":");
  const lineSeparator = token.lastIndexOf(":", columnSeparator - 1);
  if (lineSeparator < 0 || !hasNumericLineColumnSuffix(token, lineSeparator)) return false;
  const queryIndex = token.indexOf("?", lastSeparator + 1);
  const fragmentIndex = token.indexOf("#", lastSeparator + 1);
  const metadataIndexes = [queryIndex, fragmentIndex].filter(
    (index) => index >= 0 && index < lineSeparator
  );
  const extensionEnd = metadataIndexes.length > 0 ? Math.min(...metadataIndexes) : lineSeparator;
  const dot = token.lastIndexOf(".", extensionEnd - 1);
  if (dot <= lastSeparator || dot === extensionEnd - 1) return false;
  const extension = token.slice(dot + 1, extensionEnd).toLowerCase();
  if (!(SOURCE_EXT as readonly string[]).includes(extension)) return false;
  return true;
}

function looksLikeUrlStackLocation(token: string): boolean {
  if (token.length < 12 || token.length > 2048) return false;
  const lower = token.toLowerCase();
  if (!lower.startsWith("http://") && !lower.startsWith("https://")) return false;
  const columnSeparator = token.lastIndexOf(":");
  const lineSeparator = token.lastIndexOf(":", columnSeparator - 1);
  return lineSeparator > 0 && hasNumericLineColumnSuffix(token, lineSeparator);
}

function hasNumericLineColumnSuffix(value: string, separator: number): boolean {
  if (value.charCodeAt(separator) !== 0x3a) return false;
  let index = separator + 1;
  if (!isAsciiDigit(value.charCodeAt(index))) return false;
  while (index < value.length && isAsciiDigit(value.charCodeAt(index))) index++;
  if (value.charCodeAt(index) !== 0x3a) return false;

  index++;
  if (!isAsciiDigit(value.charCodeAt(index))) return false;
  while (index < value.length && isAsciiDigit(value.charCodeAt(index))) index++;
  return index === value.length;
}

function isNodeModulePathCode(code: number): boolean {
  return (
    isAsciiAlphaNumeric(code) || code === 0x2e || code === 0x2f || code === 0x5f || code === 0x2d
  );
}

function looksLikeNodeStackLocation(token: string): boolean {
  if (token.length < 10 || token.length > 2048 || !token.startsWith("node:")) return false;
  const columnSeparator = token.lastIndexOf(":");
  const lineSeparator = token.lastIndexOf(":", columnSeparator - 1);
  if (lineSeparator <= 5 || !hasNumericLineColumnSuffix(token, lineSeparator)) return false;
  for (let index = 5; index < lineSeparator; index++) {
    if (!isNodeModulePathCode(token.charCodeAt(index))) return false;
  }
  return true;
}

function looksLikeEvalStackLocation(token: string): boolean {
  return token.length <= 64 && token.startsWith("[eval]") && hasNumericLineColumnSuffix(token, 6);
}

function isRecognizedStackPathAt(value: string, start: number): boolean {
  if (hasAbsoluteFileUriAt(value, start)) return true;
  const tokenEnd = trimPathSpanEnd(value, start, findTokenEnd(value, start));
  const token = value.slice(start, tokenEnd);
  return (
    looksLikeAbsolutePath(token) ||
    looksLikeRelativeStackLocation(token) ||
    looksLikeUrlStackLocation(token) ||
    looksLikeNodeStackLocation(token) ||
    looksLikeEvalStackLocation(token)
  );
}

function isStackFrameLabel(value: string, start: number, end: number): boolean {
  const label = value.slice(start, end).trim();
  if (label.length === 0 || label.length > 256) return false;
  if (!/^[A-Za-z_$<]/.test(label) || /[^A-Za-z0-9_$.[\]<>:/ -]/.test(label)) return false;
  if (!/\s/.test(label)) return true;
  return /^(?:async|new)\s+\S+$/.test(label) || /^\S+\s+\[as\s+\S+\]$/.test(label);
}

function skipAsyncStackPrefix(value: string, start: number): number {
  if (value.slice(start, start + 5) !== "async" || !isWhitespace(value[start + 5])) return start;
  let locationStart = start + 6;
  while (locationStart < value.length && isWhitespace(value[locationStart])) locationStart++;
  return locationStart;
}

function isAggregateIndexLocationAt(value: string, start: number): boolean {
  if (value.slice(start, start + 5) !== "index" || !isWhitespace(value[start + 5])) return false;
  let index = start + 6;
  while (index < value.length && isWhitespace(value[index])) index++;
  if (!isAsciiDigit(value.charCodeAt(index))) return false;
  while (index < value.length && isAsciiDigit(value.charCodeAt(index))) index++;
  while (index < value.length && isWhitespace(value[index])) index++;
  return value.charCodeAt(index) === 0x29;
}

function looksLikeStackFrameAt(value: string, atIndex: number, allowDirectPath: boolean): boolean {
  if (value.slice(atIndex, atIndex + 2).toLowerCase() !== "at") return false;
  let labelStart = atIndex + 2;
  if (!isWhitespace(value[labelStart])) return false;
  while (labelStart < value.length && isWhitespace(value[labelStart])) labelStart++;
  labelStart = skipAsyncStackPrefix(value, labelStart);
  if (allowDirectPath && isRecognizedStackPathAt(value, labelStart)) return true;

  const openParen = value.indexOf("(", labelStart);
  if (openParen < 0 || openParen - labelStart > 256) return false;
  let pathStart = openParen + 1;
  while (pathStart < value.length && isWhitespace(value[pathStart])) pathStart++;
  return (
    isStackFrameLabel(value, labelStart, openParen) &&
    (isRecognizedStackPathAt(value, pathStart) ||
      (allowDirectPath && isAggregateIndexLocationAt(value, pathStart)))
  );
}

function looksLikeAtSignStackFrameAt(value: string, frameStart: number): boolean {
  const tokenEnd = trimPathSpanEnd(value, frameStart, findTokenEnd(value, frameStart));
  const atSign = value.indexOf("@", frameStart);
  if (atSign <= frameStart || atSign >= tokenEnd || atSign - frameStart > 256) return false;
  return isStackFrameLabel(value, frameStart, atSign) && isRecognizedStackPathAt(value, atSign + 1);
}

function findSerializedStackFrameStart(value: string): number {
  for (let index = 0; index < value.length; index++) {
    const separatorLength = serializedLineSeparatorLengthAt(value, index);
    if (separatorLength === 0) continue;
    let frameStart = index + separatorLength;
    while (frameStart < value.length) {
      while (frameStart < value.length && isWhitespace(value[frameStart])) frameStart++;
      const adjacentSeparatorLength = serializedLineSeparatorLengthAt(value, frameStart);
      if (adjacentSeparatorLength === 0) break;
      frameStart += adjacentSeparatorLength;
    }
    if (
      looksLikeStackFrameAt(value, frameStart, true) ||
      looksLikeAtSignStackFrameAt(value, frameStart)
    ) {
      let separatorStart = index;
      while (separatorStart > 0 && value.charCodeAt(separatorStart - 1) === 0x5c) {
        separatorStart--;
      }
      return separatorStart;
    }
  }
  return -1;
}

function findInlineStackFrameStart(value: string): number {
  let marker = value.indexOf(" at ");
  while (marker >= 0) {
    if (looksLikeStackFrameAt(value, marker + 1, false)) return marker;
    marker = value.indexOf(" at ", marker + 4);
  }
  return -1;
}

function findInlineAtSignStackFrameStart(value: string): number {
  let frameStart = 0;
  while (frameStart < value.length) {
    if (looksLikeAtSignStackFrameAt(value, frameStart)) {
      return frameStart > 0 && isWhitespace(value[frameStart - 1]) ? frameStart - 1 : frameStart;
    }
    const tokenEnd = findTokenEnd(value, frameStart);
    frameStart = tokenEnd;
    while (frameStart < value.length && isWhitespace(value[frameStart])) frameStart++;
  }
  return -1;
}

function physicalLineSeparatorLengthAt(value: string, start: number): number {
  const code = value.charCodeAt(start);
  if (!isPhysicalLineSeparator(code)) return 0;
  return code === 0x0d && value.charCodeAt(start + 1) === 0x0a ? 2 : 1;
}

function findPhysicalStackFrameStart(value: string): number {
  for (let index = 0; index < value.length; index++) {
    const separatorLength = physicalLineSeparatorLengthAt(value, index);
    if (separatorLength === 0) continue;
    let frameStart = index + separatorLength;
    while (frameStart < value.length && isWhitespace(value[frameStart])) frameStart++;
    if (
      looksLikeStackFrameAt(value, frameStart, true) ||
      looksLikeAtSignStackFrameAt(value, frameStart)
    ) {
      return index;
    }
    index += separatorLength - 1;
  }
  return -1;
}

/** Strip only recognized physical, serialized, and inline JavaScript stack-frame tails. */
export function stripRecognizedErrorStackTail(value: string): string {
  const candidates = [
    findPhysicalStackFrameStart(value),
    findSerializedStackFrameStart(value),
    findInlineStackFrameStart(value),
    findInlineAtSignStackFrameStart(value),
  ].filter((candidate) => candidate >= 0);
  if (candidates.length === 0) return value;
  return value.slice(0, Math.min(...candidates));
}

/**
 * Public exception messages remain fail-closed at the first physical line.
 * Provider passthroughs that require multiline capability wording use the
 * narrower recognized-frame helper above instead.
 */
export function stripErrorStackTail(value: string): string {
  let firstLineEnd = value.length;
  for (let index = 0; index < value.length; index++) {
    if (isPhysicalLineSeparator(value.charCodeAt(index))) {
      firstLineEnd = index;
      break;
    }
  }
  return stripRecognizedErrorStackTail(value.slice(0, firstLineEnd));
}

/**
 * Redact absolute filesystem paths while preserving URLs, explicitly marked
 * API routes, and punctuation around determinable endpoints. Unequivocal
 * filesystem prefixes fail closed when an unquoted endpoint is ambiguous.
 */
export function redactErrorPaths(value: string): string {
  const quotedPathsRedacted = redactQuotedAbsolutePaths(value);
  const pathSpansRedacted = redactUnquotedAbsolutePathSpans(quotedPathsRedacted);
  const parts = pathSpansRedacted.split(/(\s+)/);
  let previousToken = "";
  for (let index = 0; index < parts.length; index++) {
    const token = parts[index];
    if (isWhitespace(token)) continue;
    parts[index] = redactAbsolutePathToken(token, isRouteContextToken(previousToken));
    previousToken = token;
  }
  return parts.join("");
}
