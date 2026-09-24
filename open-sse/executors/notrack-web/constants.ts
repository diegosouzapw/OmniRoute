export const NOTRACK_BASE = "https://notrack.ai";
export const NOTRACK_DISPATCH_URL = `${NOTRACK_BASE}/api/dispatch`;

/**
 * User-Agent matches the upstream Python proxy (Chromium 150 Edge UA so the
 * notrack.ai front-door does not flag the request as a non-browser client).
 */
export const NOTRACK_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36 Edg/150.0.0.0";

/** Hard cap mirrored from the upstream Python proxy (MAX_INPUT_CHARS = 3800). */
export const MAX_INPUT_CHARS = 3800;

/** CJK block ranges — same table as the Python proxy's `_CJK_RANGES`. */
export const CJK_RANGES: ReadonlyArray<readonly [number, number]> = [
  [0x4e00, 0x9fff],
  [0x3400, 0x4dbf],
  [0x3040, 0x309f],
  [0x30a0, 0x30ff],
  [0xac00, 0xd7af],
  [0xff00, 0xffef],
];
