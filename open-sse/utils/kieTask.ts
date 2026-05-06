export type JsonObject = Record<string, unknown>;

export type KieTaskState = "success" | "failed" | "pending";

export type KieCallbackBody = {
  callBackUrl?: unknown;
  callback_url?: unknown;
  callbackUrl?: unknown;
};

export function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function getKieCallbackUrl(body: KieCallbackBody = {}): string {
  const callbackUrl = body.callBackUrl ?? body.callback_url ?? body.callbackUrl;
  return typeof callbackUrl === "string" && callbackUrl.trim().length > 0
    ? callbackUrl
    : "https://omniroute.local/api/kie/callback";
}

export function parseKieResultJson(recordData: unknown): JsonObject {
  const data = isJsonObject(recordData) && isJsonObject(recordData.data) ? recordData.data : {};
  const resultJson = data.resultJson;

  if (typeof resultJson === "string") {
    try {
      const parsed = JSON.parse(resultJson) as unknown;
      return isJsonObject(parsed) ? parsed : {};
    } catch {
      return {};
    }
  }

  return isJsonObject(resultJson) ? resultJson : {};
}

export function normalizeKieTaskState(recordData: unknown): KieTaskState {
  const record = isJsonObject(recordData) ? recordData : {};
  const data = isJsonObject(record.data) ? record.data : {};
  const state = String(
    data.status ?? data.state ?? data.successFlag ?? record.msg ?? "PENDING"
  ).toUpperCase();

  if (
    state === "SUCCESS" ||
    state === "1" ||
    state === "FINISHED" ||
    state === "COMPLETE" ||
    state === "COMPLETED" ||
    state === "FIRST_SUCCESS" ||
    state === "ALL_SUCCESS" ||
    state.includes("SUCCESS")
  ) {
    return "success";
  }

  if (
    state === "FAIL" ||
    state === "FAILED" ||
    state === "ERROR" ||
    state === "2" ||
    state === "3" ||
    state.includes("FAIL") ||
    state.includes("ERROR") ||
    state === "CREATE_TASK_FAILED" ||
    state === "GENERATE_FAILED" ||
    state === "GENERATE_AUDIO_FAILED"
  ) {
    return "failed";
  }

  return "pending";
}

export function getKieErrorStatus(error: unknown, fallback = 502): number {
  if (isJsonObject(error)) {
    const status = Number(error.status);
    if (Number.isFinite(status) && status > 0) {
      return status;
    }
  }

  return fallback;
}

export function getKieErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (isJsonObject(error) && typeof error.message === "string" && error.message.length > 0) {
    return error.message;
  }

  return typeof error === "string" && error.length > 0 ? error : fallback;
}
