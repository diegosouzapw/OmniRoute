import { BaseExecutor, mergeUpstreamExtraHeaders, mergeAbortSignals } from "./base.ts";
import { HTTP_STATUS, FETCH_TIMEOUT_MS } from "../config/constants.ts";

const DEFAULT_PORT = 8317;
const DEFAULT_HOST = "127.0.0.1";

function resolveCliproxyapiBaseUrl(): string {
  const host = process.env.CLIPROXYAPI_HOST || DEFAULT_HOST;
  const port = parseInt(process.env.CLIPROXYAPI_PORT || String(DEFAULT_PORT), 10);
  return `http://${host}:${port}`;
}

export class CliproxyapiExecutor extends BaseExecutor {
  private readonly upstreamBaseUrl: string;

  constructor() {
    super("cliproxyapi", {
      id: "cliproxyapi",
      baseUrl: resolveCliproxyapiBaseUrl() + "/v1/chat/completions",
      headers: { "Content-Type": "application/json" },
    });
    this.upstreamBaseUrl = resolveCliproxyapiBaseUrl();
  }

  buildUrl(_model: string, _stream: boolean, _urlIndex = 0): string {
    return `${this.upstreamBaseUrl}/v1/chat/completions`;
  }

  buildHeaders(credentials: any, stream = true): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const key = credentials?.apiKey || credentials?.accessToken;
    if (key) {
      headers["Authorization"] = `Bearer ${key}`;
    }

    if (stream) {
      headers["Accept"] = "text/event-stream";
    }

    return headers;
  }

  transformRequest(model: string, body: any, _stream: boolean, _credentials: any): any {
    if (body && typeof body === "object" && body.model !== model) {
      return { ...body, model };
    }
    return body;
  }

  async execute(input: {
    model: string;
    body: unknown;
    stream: boolean;
    credentials: any;
    signal?: AbortSignal | null;
    log?: any;
    upstreamExtraHeaders?: Record<string, string> | null;
  }) {
    const url = this.buildUrl(input.model, input.stream);
    const headers = this.buildHeaders(input.credentials, input.stream);
    const transformedBody = this.transformRequest(
      input.model,
      input.body,
      input.stream,
      input.credentials
    );
    mergeUpstreamExtraHeaders(headers, input.upstreamExtraHeaders);

    const timeoutSignal = AbortSignal.timeout(FETCH_TIMEOUT_MS);
    const combinedSignal = input.signal
      ? mergeAbortSignals(input.signal, timeoutSignal)
      : timeoutSignal;

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(transformedBody),
      signal: combinedSignal,
    });

    if (response.status === HTTP_STATUS.RATE_LIMITED) {
      input.log?.warn?.("CPA", `CLIProxyAPI rate limited: ${response.status}`);
    }

    return { response, url, headers, transformedBody };
  }
}

export default CliproxyapiExecutor;
