/**
 * AWS Polly TTS handler.
 *
 * Extracted out of `open-sse/handlers/audioSpeech.ts` (frozen at its
 * file-size ratchet baseline — config/quality/file-size-baseline.json) to
 * make room for the new EdgeTTS WebSocket branch (#6668). Pure provider
 * adapter, no behavior change vs. the original inline implementation.
 *
 * POST /v1/speech signed with AWS SigV4. The configured apiKey stores AWS
 * Secret Access Key; providerSpecificData.accessKeyId stores AWS Access Key
 * ID, with optional region/baseUrl/defaultVoice/sessionToken.
 */
import { stripTrailingSlashes } from "../utils/urlSanitize.ts";
import { signAwsRequest } from "../utils/awsSigV4.ts";
import { errorResponse } from "../utils/error.ts";
import { audioStreamResponse, upstreamErrorResponse } from "../utils/audioResponse.ts";

function getStringValue(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function getAwsPollyProviderData(credentials) {
  return credentials?.providerSpecificData &&
    typeof credentials.providerSpecificData === "object" &&
    !Array.isArray(credentials.providerSpecificData)
    ? credentials.providerSpecificData
    : {};
}

function resolveAwsPollyRegion(providerSpecificData) {
  return (
    getStringValue(providerSpecificData.region) ||
    getStringValue(providerSpecificData.awsRegion) ||
    process.env.AWS_REGION ||
    process.env.AWS_DEFAULT_REGION ||
    "us-east-1"
  );
}

function resolveAwsPollyBaseUrl(providerSpecificData, region) {
  const configuredBaseUrl = getStringValue(providerSpecificData.baseUrl);
  const baseUrl = configuredBaseUrl || `https://polly.${region}.amazonaws.com`;
  return stripTrailingSlashes(baseUrl.replace(/\/v1\/speech\/?$/i, ""));
}

function normalizeAwsPollyEngine(modelId) {
  const engine = getStringValue(modelId) || "standard";
  return ["standard", "neural", "long-form", "generative"].includes(engine) ? engine : "standard";
}

function normalizeAwsPollyOutputFormat(responseFormat) {
  const format = getStringValue(responseFormat)?.toLowerCase();
  switch (format) {
    case "pcm":
    case "wav":
      return "pcm";
    case "opus":
    case "ogg_opus":
      return "ogg_opus";
    case "ogg":
    case "ogg_vorbis":
      return "ogg_vorbis";
    case "json":
      return "json";
    case "mp3":
    default:
      return "mp3";
  }
}

function normalizeAwsPollyTextType(body) {
  const explicitTextType = getStringValue(body.text_type || body.textType)?.toLowerCase();
  if (explicitTextType === "ssml") return "ssml";
  if (explicitTextType === "text") return "text";

  const input = getStringValue(body.input) || "";
  return input.trim().startsWith("<speak") ? "ssml" : "text";
}

function getAwsPollySampleRate(responseFormat, sampleRate) {
  const explicit = getStringValue(sampleRate || null);
  if (explicit) return explicit;

  const outputFormat = normalizeAwsPollyOutputFormat(responseFormat);
  if (outputFormat === "ogg_opus") return "48000";
  if (outputFormat === "pcm") return "16000";
  return undefined;
}

export async function handleAwsPollySpeech(
  providerConfig,
  body,
  modelId,
  token,
  credentials
): Promise<Response> {
  const providerSpecificData = getAwsPollyProviderData(credentials);
  const accessKeyId =
    getStringValue(providerSpecificData.accessKeyId) ||
    getStringValue(providerSpecificData.awsAccessKeyId);
  const secretAccessKey = getStringValue(token);

  if (!accessKeyId) {
    return errorResponse(400, "AWS Polly requires providerSpecificData.accessKeyId");
  }
  if (!secretAccessKey) {
    return errorResponse(401, "No AWS Secret Access Key for AWS Polly");
  }

  const region = resolveAwsPollyRegion(providerSpecificData);
  const baseUrl = resolveAwsPollyBaseUrl(providerSpecificData, region);
  const url = `${baseUrl}/v1/speech`;
  const outputFormat = normalizeAwsPollyOutputFormat(body.response_format);
  const sampleRate = getAwsPollySampleRate(
    body.response_format,
    body.sample_rate || body.sampleRate
  );

  const requestBody = {
    Engine: normalizeAwsPollyEngine(modelId),
    OutputFormat: outputFormat,
    Text: body.input,
    TextType: normalizeAwsPollyTextType(body),
    VoiceId:
      getStringValue(body.voice) || getStringValue(providerSpecificData.defaultVoice) || "Joanna",
    ...(getStringValue(body.language_code || body.languageCode)
      ? { LanguageCode: getStringValue(body.language_code || body.languageCode) }
      : {}),
    ...(sampleRate ? { SampleRate: sampleRate } : {}),
  };
  const serializedBody = JSON.stringify(requestBody);

  const signedHeaders = signAwsRequest({
    method: "POST",
    url,
    region,
    service: "polly",
    headers: {
      "content-type": "application/json",
    },
    body: serializedBody,
    credentials: {
      accessKeyId,
      secretAccessKey,
      sessionToken:
        getStringValue(providerSpecificData.sessionToken) ||
        getStringValue(providerSpecificData.awsSessionToken),
    },
  });

  const res = await fetch(url, {
    method: "POST",
    headers: signedHeaders,
    body: serializedBody,
  });

  if (!res.ok) {
    return upstreamErrorResponse(res, await res.text());
  }

  return audioStreamResponse(res, outputFormat === "pcm" ? "audio/pcm" : "audio/mpeg");
}
