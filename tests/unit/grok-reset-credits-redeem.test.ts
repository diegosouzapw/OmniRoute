import test from "node:test";
import assert from "node:assert/strict";
import {
  consumeGrokResetCredit,
  listGrokResetCreditTokens,
  mapGrokRedeemGrpcStatus,
} from "../../open-sse/services/grokResetCredits.ts";
import { encodeRedeemResetRequest } from "../../open-sse/services/grokResetCreditsFrame.ts";

const GRANTED = 1786560540;
const EXPIRES = 1789238940;
const TOKEN_ID = "test-token-id";
const REDEEM_URL = "https://grok.com/prod_mc_billing.ConsumerUiSvc/RedeemReset";
const LIST_URL = "https://grok.com/prod_mc_billing.ConsumerUiSvc/GetRemainingResets";

function encodeVarint(value: number): Buffer {
  const bytes: number[] = [];
  let v = BigInt(value);
  do {
    let byte = Number(v & 0x7fn);
    v >>= 7n;
    if (v !== 0n) byte |= 0x80;
    bytes.push(byte);
  } while (v !== 0n);
  return Buffer.from(bytes);
}

function encodeTag(fieldNumber: number, wireType: number): Buffer {
  return encodeVarint((fieldNumber << 3) | wireType);
}

function encodeLengthDelimited(fieldNumber: number, body: Buffer): Buffer {
  return Buffer.concat([encodeTag(fieldNumber, 2), encodeVarint(body.length), body]);
}

function encodeVarintField(fieldNumber: number, value: number): Buffer {
  return Buffer.concat([encodeTag(fieldNumber, 0), encodeVarint(value)]);
}

function grpcFrame(flag: number, payload: Buffer): Buffer {
  const header = Buffer.alloc(5);
  header[0] = flag;
  header.writeUInt32BE(payload.length, 1);
  return Buffer.concat([header, payload]);
}

function trailerResponse(status: number, message?: string): Response {
  const lines = [`grpc-status:${status}\r\n`];
  if (message) lines.push(`grpc-message:${encodeURIComponent(message)}\r\n`);
  const trailer = Buffer.from(lines.join(""), "utf8");
  return new Response(Buffer.concat([grpcFrame(0x00, Buffer.alloc(0)), grpcFrame(0x80, trailer)]), {
    status: 200,
    headers: { "content-type": "application/grpc-web+proto" },
  });
}

function listResponse(tokens: Array<{ id: string; expires: number }>): Response {
  const payload = Buffer.concat(
    tokens.map((token) =>
      encodeLengthDelimited(
        10,
        Buffer.concat([
          encodeLengthDelimited(1, Buffer.from(token.id, "utf8")),
          encodeVarintField(2, GRANTED),
          encodeVarintField(3, token.expires),
        ])
      )
    )
  );
  const trailer = Buffer.from("grpc-status:0\r\n", "utf8");
  return new Response(Buffer.concat([grpcFrame(0x00, payload), grpcFrame(0x80, trailer)]), {
    status: 200,
    headers: { "content-type": "application/grpc-web+proto" },
  });
}

test("mapGrokRedeemGrpcStatus treats grpc 0 as reset", () => {
  assert.equal(mapGrokRedeemGrpcStatus("0", null), "reset");
});

test("mapGrokRedeemGrpcStatus treats missing token as noCredit", () => {
  assert.equal(
    mapGrokRedeemGrpcStatus("9", "The token cannot be redeemed: it does not exist or is expired"),
    "noCredit"
  );
});

test("mapGrokRedeemGrpcStatus treats already-redeemed as alreadyRedeemed", () => {
  assert.equal(mapGrokRedeemGrpcStatus("9", "token already redeemed"), "alreadyRedeemed");
});

test("mapGrokRedeemGrpcStatus treats invalid token_id as noCredit", () => {
  assert.equal(mapGrokRedeemGrpcStatus("3", "redeem_reset(), Invalid token_id"), "noCredit");
});

test("listGrokResetCreditTokens returns public rows ordered by expiry", async () => {
  const listed = await listGrokResetCreditTokens("fixture-access-token", async (url) => {
    assert.equal(String(url), LIST_URL);
    return listResponse([
      { id: "test-token-bb", expires: EXPIRES + 86400 },
      { id: "test-token-aa", expires: EXPIRES },
    ]);
  });
  assert.equal(listed.availableCount, 2);
  assert.deepEqual(
    listed.credits.map((credit) => credit.selectionToken),
    ["test-token-aa", "test-token-bb"]
  );
  assert.equal(listed.credits[0]?.expiresAt, new Date(EXPIRES * 1000).toISOString());
});

test("consumeGrokResetCredit posts RedeemReset with protobuf field 10 and skips inventory when tokenId is given", async () => {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const outcome = await consumeGrokResetCredit(
    "fixture-access-token",
    { tokenId: TOKEN_ID },
    async (url, init = {}) => {
      calls.push({ url: String(url), init });
      if (String(url) === LIST_URL) return listResponse([{ id: TOKEN_ID, expires: EXPIRES }]);
      return trailerResponse(0);
    }
  );
  assert.equal(outcome, "reset");
  assert.equal(
    calls.some((call) => call.url === LIST_URL),
    false
  );
  const redeem = calls.find((call) => call.url === REDEEM_URL);
  assert.ok(redeem);
  assert.equal(redeem?.init.method, "POST");
  const body = Buffer.from(redeem?.init.body as Buffer);
  const payload = body.subarray(5);
  assert.deepEqual(payload, encodeRedeemResetRequest(TOKEN_ID));
  const headers = redeem?.init.headers as Record<string, string>;
  assert.equal(headers.Authorization, ["Bearer", "fixture-access-token"].join(" "));
});

test("consumeGrokResetCredit picks the token that expires first when none is selected", async () => {
  const calls: Array<{ url: string; body: Buffer | null }> = [];
  const outcome = await consumeGrokResetCredit("fixture-access-token", {}, async (url, init = {}) => {
    const body = init.body ? Buffer.from(init.body as Buffer) : null;
    calls.push({ url: String(url), body });
    if (String(url) === LIST_URL) {
      return listResponse([
        { id: "test-token-bb", expires: EXPIRES + 86400 },
        { id: "test-token-aa", expires: EXPIRES },
      ]);
    }
    return trailerResponse(0);
  });
  assert.equal(outcome, "reset");
  const redeem = calls.find((call) => call.url === REDEEM_URL);
  assert.ok(redeem?.body);
  const payload = redeem!.body!.subarray(5);
  assert.deepEqual(payload, encodeRedeemResetRequest("test-token-aa"));
});

test("consumeGrokResetCredit maps a missing selected token via RedeemReset grpc-status 9", async () => {
  const { GrokResetCreditError } = await import("../../open-sse/services/grokResetCredits.ts");
  await assert.rejects(
    () =>
      consumeGrokResetCredit(
        "fixture-access-token",
        { tokenId: "missing-token" },
        async (url) => {
          if (String(url) === LIST_URL) return listResponse([{ id: TOKEN_ID, expires: EXPIRES }]);
          return trailerResponse(
            9,
            "The token cannot be redeemed: it does not exist or is expired"
          );
        }
      ),
    (error: unknown) =>
      error instanceof GrokResetCreditError && error.status === 409 && error.code === "no_credit"
  );
});
