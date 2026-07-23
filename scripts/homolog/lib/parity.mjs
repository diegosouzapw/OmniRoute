/**
 * Avaliação pura de paridade do deploy (testável sem rede).
 * @param {{status?: string, version?: string}} health corpo de /api/monitoring/health
 * @param {{expectedVersion: string, httpStatus: number}} ctx
 * @returns {{ok: boolean, failures: string[]}}
 */
export function evaluateParity(health, ctx) {
  const failures = [];
  if (ctx.httpStatus !== 200) failures.push(`health HTTP ${ctx.httpStatus} (esperado 200)`);
  if (health?.status !== "healthy")
    failures.push(`status "${health?.status}" (esperado "healthy")`);
  if (health?.version !== ctx.expectedVersion)
    failures.push(`version "${health?.version}" (esperado "${ctx.expectedVersion}")`);
  return { ok: failures.length === 0, failures };
}
