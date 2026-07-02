import { updateToolHealth } from "@/lib/db/versionManager";

interface HealthResult {
  healthy: boolean;
  latency: number;
  modelCount: number;
  error: string | null;
}

const monitoringIntervals = new Map<string, NodeJS.Timeout>();

async function checkHealth(url: string, healthPath?: string): Promise<HealthResult> {
  const basePath = healthPath || "/v1/models";
  const start = Date.now();

  try {
    const res = await fetch(`${url}${basePath}`, {
      signal: AbortSignal.timeout(5000),
      headers: { Authorization: "Bearer omniroute-internal" },
    });

    const latency = Date.now() - start;

    if (!res.ok) {
      return { healthy: false, latency, modelCount: 0, error: `HTTP ${res.status}` };
    }

    const data = await res.json();
    const modelCount = Array.isArray(data.data) ? data.data.length : 0;

    return { healthy: true, latency, modelCount, error: null };
  } catch (err) {
    const latency = Date.now() - start;
    const message = err instanceof Error ? err.message : String(err);
    return { healthy: false, latency, modelCount: 0, error: message };
  }
}

export { checkHealth };
export type { HealthResult };

export function startMonitoring(
  tool: string,
  url: string,
  intervalMs: number = 30_000,
  healthPath?: string
): void {
  stopMonitoring(tool);

  const doCheck = async () => {
    const result = await checkHealth(url, healthPath);
    const status = result.healthy ? "healthy" : "unhealthy";
    await updateToolHealth(tool, status).catch(() => {});
  };

  doCheck();
  const timer = setInterval(doCheck, intervalMs);
  monitoringIntervals.set(tool, timer);
}

export function stopMonitoring(tool: string): void {
  const timer = monitoringIntervals.get(tool);
  if (timer) {
    clearInterval(timer);
    monitoringIntervals.delete(tool);
  }
}

export function isMonitoring(tool: string): boolean {
  return monitoringIntervals.has(tool);
}
