/**
 * Decide whether a connection row should render its `lastError` text.
 *
 * A disabled connection (`isActive === false`) is still counted by the provider
 * card's error badge (`getEffectiveStatus` → error/expired/unavailable, which does
 * not look at `isActive`). Hiding its error text left the operator unable to see
 * *what* failed on a row the dashboard flags as errored. So the error text is shown
 * whenever there is a `lastError`, regardless of the active toggle. (#1447)
 */
export function shouldShowConnectionLastError(connection: {
  lastError?: string;
  isActive?: boolean;
}): boolean {
  return Boolean(connection.lastError);
}
