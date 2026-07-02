import { SignJWT } from "jose";

export const TEST_MANAGEMENT_JWT_SECRET = "test-management-jwt-secret";

function appendCookie(existingCookieHeader: string | null, cookie: string): string {
  if (!existingCookieHeader) return cookie;
  return `${existingCookieHeader}; ${cookie}`;
}

export async function createManagementSessionToken(
  secret = process.env.JWT_SECRET || TEST_MANAGEMENT_JWT_SECRET
): Promise<string> {
  process.env.JWT_SECRET = secret;

  return new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(secret));
}

export async function createManagementSessionHeaders(headers?: HeadersInit): Promise<Headers> {
  const requestHeaders = new Headers(headers);
  const token = await createManagementSessionToken();
  requestHeaders.set("cookie", appendCookie(requestHeaders.get("cookie"), `auth_token=${token}`));
  return requestHeaders;
}

export async function makeManagementSessionRequest(
  url: string,
  options: {
    method?: string;
    token?: string;
    headers?: HeadersInit;
    body?: BodyInit | Record<string, unknown> | unknown[] | number | boolean | null;
  } = {}
): Promise<Request> {
  const { method = "GET", token, headers, body } = options;
  const requestHeaders = await createManagementSessionHeaders(headers);

  if (token) {
    requestHeaders.set("authorization", `Bearer ${token}`);
  }

  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  const isUrlSearchParams =
    typeof URLSearchParams !== "undefined" && body instanceof URLSearchParams;
  const isStringBody = typeof body === "string";
  const shouldSerializeJson =
    body !== undefined && !isFormData && !isUrlSearchParams && !isStringBody;

  if (body !== undefined && !requestHeaders.has("content-type") && !isFormData) {
    requestHeaders.set(
      "content-type",
      isUrlSearchParams ? "application/x-www-form-urlencoded;charset=UTF-8" : "application/json"
    );
  }

  return new Request(url, {
    method,
    headers: requestHeaders,
    body: shouldSerializeJson ? JSON.stringify(body) : body,
  });
}
