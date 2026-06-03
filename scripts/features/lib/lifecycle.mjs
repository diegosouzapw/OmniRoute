/**
 * Lifecycle detectors: stale need_details, stale defer, closed-externally.
 */

export function isStaleNeedDetails(issue, thresholdDays, now = new Date()) {
  const authorLogin = issue.author?.login;
  let lastAuthorActivity = issue.createdAt;
  for (const c of issue.comments ?? []) {
    if (c.author?.login === authorLogin) {
      if (new Date(c.createdAt).getTime() > new Date(lastAuthorActivity).getTime()) {
        lastAuthorActivity = c.createdAt;
      }
    }
  }
  const daysSilent = Math.floor(
    (now.getTime() - new Date(lastAuthorActivity).getTime()) / 86400_000
  );
  return {
    stale: daysSilent >= thresholdDays,
    daysSilent,
    lastAuthorActivity,
  };
}

export function isStaleDefer(meta, thresholdDays, now = new Date(), fallbackDate = null) {
  const classifiedAt = meta?.snapshot?.classified_at || fallbackDate;
  if (!classifiedAt) return { stale: false, daysInDefer: 0 };
  const daysInDefer = Math.floor((now.getTime() - new Date(classifiedAt).getTime()) / 86400_000);
  return { stale: daysInDefer >= thresholdDays, daysInDefer };
}

export function detectClosedExternally(issue, meta) {
  const issueState = String(issue.state ?? "").toUpperCase();
  const snapshotState = String(meta?.snapshot?.state ?? "open").toLowerCase();
  if (issueState !== "CLOSED") return { flagged: false };
  if (snapshotState === "closed") return { flagged: false };
  const stateReason = issue.stateReason ?? null;
  const out = { flagged: true, closedAt: issue.closedAt, stateReason };
  if (stateReason === "COMPLETED") {
    out.warningMessage = "possibly delivered by external work";
  }
  return out;
}
