export const STATUSES = Object.freeze(["PASS", "FAIL", "INFRA_ERROR", "SKIPPED"]);
export const VERDICTS = Object.freeze(["VERIFIED", "FAILED", "UNVERIFIED"]);

export function gateKey(rec) {
  return {
    gate_id: rec.gate_id,
    suite_id: rec.suite_id ?? null,
    shard_index: rec.shard_index ?? null,
    shard_total: rec.shard_total ?? null,
  };
}

export function keyId(k) {
  return `${k.gate_id}\0${k.suite_id ?? ""}\0${k.shard_index ?? ""}\0${k.shard_total ?? ""}`;
}

export function sameKey(a, b) {
  return keyId(a) === keyId(b);
}
