/**
 * Ad-hoc, one-shot dry run of STRICT_ZERO_COST against the real candidate
 * pools currently served by this OmniRoute instance (fetched via the
 * existing read-only `GET /v1/auto-combo/{channel}/candidates` endpoint —
 * no changes made, no billable calls). Not wired into any test suite.
 *
 * Simulates the filter offline: no live usage-quota state is available
 * (that adapter only runs inside the deployed container), so
 * `resolveFreeAccessState` always returns `undefined` here — meaning any
 * quota-based candidate is reported UNKNOWN unless it lacks even a usage
 * adapter, in which case it's reported UNKNOWN for that reason instead. This
 * intentionally shows the current, honest ceiling of what's usable today.
 *
 * Uses each candidate's REAL `connectionId` from the live endpoint (rather
 * than assuming) to also exercise the post-code-review connection-safety
 * check: a `keyless`-catalogued model whose live `connectionId` is NOT the
 * no-auth sentinel is correctly reported as excluded here too.
 */
import { readFileSync } from "node:fs";
import {
  evaluateCandidateConnections,
  findBudgetEntry,
} from "../../open-sse/services/autoCombo/strictZeroCostFilter.ts";
import { SYNTHETIC_NOAUTH_CONNECTION_ID } from "../../open-sse/services/autoCombo/resilienceCandidateFilter.ts";
import { USAGE_FETCHER_PROVIDERS } from "../../open-sse/services/usage.ts";

const usageProviders = new Set<string>(USAGE_FETCHER_PROVIDERS);
const OPTIONS = { minRemainingAllowance: 1, maxStateAgeMs: 180_000 };

interface Candidate {
  provider: string;
  model: string;
  connectionId: string;
}

function loadCandidates(path: string): Candidate[] {
  const raw = JSON.parse(readFileSync(path, "utf8"));
  const list = Array.isArray(raw) ? raw : raw.candidates;
  // The candidates endpoint's `model` field is the FULL "<providerOrAlias>/<modelId>"
  // string (`modelStr` — the leading segment is sometimes the provider id,
  // e.g. "groq/...", sometimes its short alias, e.g. "oc/..." for opencode);
  // FREE_MODEL_BUDGETS.modelId is always bare. Strip exactly the first "/"
  // segment (whichever form it is) so e.g. "groq/meta-llama/llama-4-scout..."
  // becomes "meta-llama/llama-4-scout..." and "oc/big-pickle" becomes
  // "big-pickle", matching the catalog's modelId either way.
  return list.map((c: { provider: string; model: string; connectionId?: string }) => {
    const slash = c.model.indexOf("/");
    return {
      provider: c.provider,
      model: slash === -1 ? c.model : c.model.slice(slash + 1),
      connectionId: c.connectionId ?? SYNTHETIC_NOAUTH_CONNECTION_ID,
    };
  });
}

function run(label: string, path: string): void {
  const candidates = loadCandidates(path);
  console.log(`\n=== ${label} — ${candidates.length} candidati live ===`);

  const kept: Candidate[] = [];
  const excluded: { candidate: Candidate; reason: string }[] = [];

  for (const c of candidates) {
    const entry = findBudgetEntry(c);
    if (!entry) {
      excluded.push({ candidate: c, reason: "non presente nel catalogo free curato" });
      continue;
    }
    const isNoAuthConnection = c.connectionId === SYNTHETIC_NOAUTH_CONNECTION_ID;
    if (entry.freeType === "keyless") {
      const safe = evaluateCandidateConnections(c, entry, () => undefined, OPTIONS);
      if (safe.length > 0) {
        kept.push(c);
      } else if (!isNoAuthConnection) {
        excluded.push({
          candidate: c,
          reason:
            "keyless nel catalogo ma raggiunto tramite una connessione DB reale (non il sentinel noauth) — shortcut non applicato, richiederebbe hardStopGuaranteed",
        });
      } else {
        excluded.push({ candidate: c, reason: "keyless ma valutazione fallita (inatteso)" });
      }
      continue;
    }
    const hasAdapter = usageProviders.has(entry.provider);
    const reason = !hasAdapter
      ? `nessun usage adapter per '${entry.provider}' in USAGE_FETCHER_PROVIDERS`
      : entry.hardStopGuaranteed !== true
        ? "hardStopGuaranteed non dichiarato per questo modello"
        : "nessuno stato quota live disponibile in questo dry-run offline (richiederebbe il container reale)";
    excluded.push({ candidate: c, reason });
  }

  console.log(`PRIMA (STRICT_ZERO_COST off): ${candidates.length} candidati`);
  console.log(`DOPO  (STRICT_ZERO_COST on):  ${kept.length} candidati sopravvissuti`);
  console.log("Sopravvissuti:");
  for (const c of kept) console.log(`  OK   ${c.provider}/${c.model}`);
  console.log("Esclusi (motivo):");
  for (const { candidate: c, reason } of excluded) {
    console.log(`  EXCL ${c.provider}/${c.model} — ${reason}`);
  }
}

run("auto/coding:free", process.argv[2] ?? "/tmp/dryrun_coding_free.json");
run("auto/best-free", process.argv[3] ?? "/tmp/dryrun_best-free.json");
