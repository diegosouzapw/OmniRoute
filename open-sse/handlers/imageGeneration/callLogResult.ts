import { saveCallLog } from "@/lib/usageDb";

export function saveImageSuccessResult({
  provider,
  model,
  connectionId = null,
  startTime,
  requestBody = null,
  responseBody = null,
  created = null,
  images,
  path = "/v1/images/generations",
}) {
  saveCallLog({
    method: "POST",
    path,
    status: 200,
    model: `${provider}/${model}`,
    provider,
    connectionId,
    duration: Date.now() - startTime,
    requestBody,
    responseBody,
  }).catch(() => {});

  return {
    success: true,
    data: {
      created: created || Math.floor(Date.now() / 1000),
      data: images,
    },
  };
}

export function saveImageErrorResult({
  provider,
  model,
  connectionId = null,
  status,
  startTime,
  error,
  requestBody = null,
  path = "/v1/images/generations",
}) {
  saveCallLog({
    method: "POST",
    path,
    status,
    model: `${provider}/${model}`,
    provider,
    connectionId,
    duration: Date.now() - startTime,
    error: typeof error === "string" ? error.slice(0, 500) : String(error).slice(0, 500),
    requestBody,
  }).catch(() => {});

  return {
    success: false,
    status,
    error,
  };
}
