const checkmark = (v) => (v ? "\x1b[32m✓\x1b[0m" : "\x1b[31m✗\x1b[0m");
const bullet = (v) => (v ? "\x1b[32m●\x1b[0m" : "");
const statusColor = (v) => {
  if (!v) return "";
  const s = String(v).toLowerCase();
  if (s === "ok" || s === "active" || s === "success") return `\x1b[32m${v}\x1b[0m`;
  if (s === "warn" || s === "degraded") return `\x1b[33m${v}\x1b[0m`;
  return `\x1b[31m${v}\x1b[0m`;
};

export const providerListSchema = [
  { key: "provider", header: "Provider", width: 20 },
  { key: "name", header: "Name", width: 30 },
  { key: "isActive", header: "Active", width: 8, formatter: checkmark },
  { key: "testStatus", header: "Status", width: 12, formatter: statusColor },
  { key: "lastTested", header: "Last Test", width: 22 },
];

export const comboListSchema = [
  { key: "name", header: "Name", width: 26 },
  { key: "strategy", header: "Strategy", width: 18 },
  { key: "enabled", header: "Enabled", width: 9, formatter: checkmark },
  { key: "active", header: "Active", width: 8, formatter: bullet },
];

export const modelListSchema = [
  { key: "id", header: "Model ID", width: 46 },
  { key: "provider", header: "Provider", width: 20 },
  { key: "contextWindow", header: "Context", width: 10 },
];

export const healthSchema = [
  { key: "component", header: "Component", width: 26 },
  { key: "status", header: "Status", width: 10, formatter: statusColor },
  { key: "message", header: "Message" },
];

export const quotaSchema = [
  { key: "provider", header: "Provider", width: 20 },
  { key: "used", header: "Used", width: 12 },
  { key: "limit", header: "Limit", width: 12 },
  { key: "remaining", header: "Remaining", width: 14 },
  { key: "resetAt", header: "Resets At", width: 22 },
];

export const keysListSchema = [
  { key: "provider", header: "Provider", width: 20 },
  { key: "name", header: "Name", width: 30 },
  { key: "isActive", header: "Active", width: 8, formatter: checkmark },
  { key: "testStatus", header: "Status", width: 12, formatter: statusColor },
];

export const cacheStatusSchema = [
  { key: "key", header: "Metric", width: 28 },
  { key: "value", header: "Value" },
];
