/**
 * Shared MOCK signing constants + synthetic bundle fixtures for MaxAI unit tests.
 *
 * IMPORTANT: nothing here is a real MaxAI value. Every id/key/version is an
 * obviously-synthetic placeholder that is merely SHAPE-valid (hex / UUID /
 * webpage_x.y.z) so it exercises the same validation/parse paths the real values
 * would. The real constants are fetched at runtime and persisted to the DB; they
 * never appear in the repo (source or tests).
 *
 * The signer tests prove the HMAC→SM3→AES ALGORITHM by comparing the production
 * signer's output to an INDEPENDENT reference implementation (below) computed over
 * the same mock key — algorithm correctness without pinning any captured vector.
 */
import { createHmac, createHash } from "node:crypto";
import type { MaxaiSigningConstants } from "../../../open-sse/executors/maxai/constants.ts";
import { MAXAI_DEFAULT_HEADER_NAMES } from "../../../open-sse/executors/maxai/constants.ts";

/** Obviously-fake, shape-valid mock constants (40+ hex, UUID, webpage_x.y.z). */
export const MOCK_HMAC_KEY = "a".repeat(56); // 56 hex chars, like the real key's shape
export const MOCK_AES_KEY = "b".repeat(56);
export const MOCK_CTX_KEY = "c".repeat(40); // 40 hex chars
export const MOCK_DOC_ID_KEY = "00000000-0000-4000-8000-000000000000"; // UUID shape
export const MOCK_APP_VERSION = "webpage_0.0.0"; // version shape, clearly not real
export const MOCK_USER_ID = "11111111-1111-4111-8111-111111111111";
export const MOCK_DEVICE_ID = "22222222-2222-4222-8222-222222222222";

export const MOCK_CONSTANTS: MaxaiSigningConstants = {
  hmacKey: MOCK_HMAC_KEY,
  aesKey: MOCK_AES_KEY,
  appVersion: MOCK_APP_VERSION,
  ctxKey: MOCK_CTX_KEY,
  docIdKey: MOCK_DOC_ID_KEY,
  headerNames: { ...MAXAI_DEFAULT_HEADER_NAMES },
  source: "extracted",
  extractedAt: 0,
};

/**
 * INDEPENDENT reference implementation of the SM3 proof `p` (deliberately NOT
 * imported from the production module) so a passing test proves the production
 * math matches an external spec, not merely itself.
 */
export function referenceProof(
  appVersion: string,
  reqTime: number,
  path: string,
  userId: string,
  hmacKey: string
): string {
  const signStr = `${appVersion}:${reqTime}:${path}:${userId}`;
  const sha1 = createHmac("sha1", Buffer.from(`${reqTime}:${hmacKey}`, "utf8"))
    .update(Buffer.from(signStr, "utf8"))
    .digest("hex");
  return createHash("sm3")
    .update(Buffer.from(`${reqTime}:${sha1}:${hmacKey}`, "utf8"))
    .digest("hex");
}

/**
 * Build a SYNTHETIC `pages/_app` chunk that mirrors the real webpack shape the
 * parser matches: module 69319 defining export getters `Mn/Rl/U0` over `let`
 * vars, plus the sole `webpage_x.y.z` literal. Uses only the MOCK values.
 */
export function makeSyntheticAppChunk(
  c: {
    hmacKey?: string;
    aesKey?: string;
    docIdKey?: string;
    appVersion?: string;
  } = {}
): string {
  const hmac = c.hmacKey ?? MOCK_HMAC_KEY;
  const aes = c.aesKey ?? MOCK_AES_KEY;
  const doc = c.docIdKey ?? MOCK_DOC_ID_KEY;
  const ver = c.appVersion ?? MOCK_APP_VERSION;
  // Mirrors the real bundle: getters export short vars; the const run assigns the
  // literals (kept in a separate region, exactly like the minified original).
  return [
    `(self.webpackChunk=self.webpackChunk||[]).push([[69319],{`,
    `69319:function(e,t,a){"use strict";a.d(t,{`,
    `Mn:function(){return u},Rl:function(){return s},U0:function(){return c},`,
    `GB:function(){return m},$0:function(){return p}});`,
    `let l="https://api.maxai.me",i="${ver}",o="MAXAI_APP",`,
    `s="${aes}",u="${hmac}",c="${doc}",d="website-nextjs",p="prod",m=!1;`,
    `}}]);`,
  ].join("");
}

/**
 * Build a SYNTHETIC signer chunk that mirrors the real payload-assembly shape:
 * the ctx slot `"<40hex>":{a:await this.getContext()}` plus `(0,r.nj)("<hex>")`
 * header-name decoders. Uses only the MOCK ctx key.
 */
export function makeSyntheticSignerChunk(ctxKey: string = MOCK_CTX_KEY): string {
  const nj = (s: string) => `(0,r.nj)("${Buffer.from(s, "utf8").toString("hex")}")`;
  return [
    `n.set(${nj("X-Browser-Name")},"Firefox");`,
    `n.set(${nj("X-Authorization")},(0,r.P0)({`,
    `[${nj("X-Client-Domain")}]:b,[${nj("X-Client-Path")}]:I,`,
    `[${nj("X-Random")}]:Math.floor(1e5+9e5*Math.random()).toString(),`,
    `[${nj("t")}]:m,[${nj("p")}]:T,[${nj("d")}]:await this.getAPIFetchDeviceID(),`,
    `"${ctxKey}":{a:await this.getContext()}},i.Rl));`,
    `n.set(${nj("X-App-Version")},i.F8);`,
    `n.set(${nj("X-App-Env")},${nj("MaxAI-Browser-Extension")});`,
  ].join("");
}

/** Build the app HTML that references synthetic chunk URLs (build-independent). */
export function makeSyntheticAppHtml(
  opts: { appChunk?: string; signerChunk?: string; extra?: string[] } = {}
): string {
  const app = opts.appChunk ?? "/_next/static/chunks/pages/_app-deadbeef.js";
  const signer = opts.signerChunk ?? "/_next/static/chunks/91234-cafebabe.js";
  const extras = (opts.extra ?? ["/_next/static/chunks/webpack-1111.js"]).map(
    (u) => `<script src="${u}"></script>`
  );
  return (
    extras.join("") +
    `<script src="${app}"></script>` +
    `<script src="${signer}"></script>`
  );
}
