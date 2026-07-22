const callLogsDb = await import("../../src/lib/usage/callLogs.ts");

export async function getLatestCallLog() {
  const rows = await callLogsDb.getCallLogs({ limit: 5 });
  return Array.isArray(rows) && rows.length > 0 ? callLogsDb.getCallLogById(rows[0].id) : null;
}

export async function getResponsesCallLogs() {
  const rows = await callLogsDb.getCallLogs({ limit: 200 });
  return Array.isArray(rows) ? rows.filter((row) => row.path === "/v1/responses") : [];
}
