import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "easyia_portal";

function getSecret() {
  return new TextEncoder().encode(
    process.env.SITE_PORTAL_SECRET || "easyia-local-portal-secret-change-me"
  );
}

export function getPortalCookieName() {
  return COOKIE_NAME;
}

export async function signPortalSession(payload: {
  email: string;
  apiKey: string;
  customerId: string;
}) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(getSecret());
}

export async function verifyPortalSession(token: string) {
  const { payload } = await jwtVerify(token, getSecret());
  return {
    email: String(payload.email || ""),
    apiKey: String(payload.apiKey || ""),
    customerId: String(payload.customerId || ""),
  };
}
