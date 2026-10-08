import type { ModelTestBatch } from "./catalogBulkUtils";
import {
  mapBatchResponse,
  mapComboResponse,
  mapRequestFailure,
  mapSingleModelResponse,
  readJsonBody,
  type BatchModelTestResponse,
  type ComboTestResponse,
  type SingleModelTestResponse,
} from "./catalogTestResponses";
import type { CatalogTestResult } from "./catalogTestStorage";

// One health-test request each. A request that fails (network error, abort, unreadable body)
// resolves to error results rather than rejecting, so callers always get something to store.

const JSON_HEADERS = { "Content-Type": "application/json" };

export async function requestComboTest(
  comboName: string,
  signal: AbortSignal
): Promise<CatalogTestResult> {
  try {
    const res = await fetch("/api/combos/test", {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ comboName }),
      signal,
    });
    const body = await readJsonBody<ComboTestResponse>(res);
    return mapComboResponse(comboName, res, body, Date.now());
  } catch (failure) {
    return mapRequestFailure({ targetType: "combo", comboName }, failure, Date.now());
  }
}

export async function requestSingleModelTest(
  providerId: string,
  modelId: string,
  signal: AbortSignal
): Promise<CatalogTestResult> {
  try {
    const res = await fetch("/api/models/test", {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({ providerId, modelId }),
      signal,
    });
    const body = await readJsonBody<SingleModelTestResponse>(res);
    return mapSingleModelResponse(providerId, modelId, res, body, Date.now());
  } catch (failure) {
    return mapRequestFailure({ targetType: "model", providerId, modelId }, failure, Date.now());
  }
}

export async function requestModelBatchTest(
  batch: ModelTestBatch,
  signal: AbortSignal
): Promise<CatalogTestResult[]> {
  try {
    const res = await fetch("/api/models/test-all", {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({
        providerId: batch.providerId,
        modelIds: batch.modelIds,
        respectRateLimit: true,
      }),
      signal,
    });
    const body = await readJsonBody<BatchModelTestResponse>(res);
    return mapBatchResponse(batch, res, body, Date.now());
  } catch (failure) {
    const testedAt = Date.now();
    return batch.modelIds.map((modelId) =>
      mapRequestFailure(
        { targetType: "model", providerId: batch.providerId, modelId },
        failure,
        testedAt
      )
    );
  }
}
